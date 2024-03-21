
import os
import discord
import random
import json
from dotenv import load_dotenv
from discord import ui 
import psycopg2
import PyPDF2
import io
import requests
import datetime
from datetime import timedelta

#gets the number of word from a file
def nb_mots_pdf(url):
    response=requests.get(url)
    pdf_io_bytes = io.BytesIO(response.content)
    pdf = PyPDF2.PdfReader(pdf_io_bytes)
    nb_mots=0
    for page in pdf.pages:
        text_list=page.extract_text().split(' ')
        liste_lettre=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','0','1','2','3','4','5','6','7','8','9','10']
        for word in text_list:
            is_word=False
            for lettre in liste_lettre:
                if lettre in word:
                    is_word=True
            if is_word==False:
                text_list.remove(word)

        for word in text_list:
            if word in ['\n',',','','.','!',':',"'",' ','?',';','-','(',')','"']:
                text_list.remove(word)
        for word in text_list:
            if word in ['\n',',','','.','!',':',"'",' ','?',';','-','(',')']:
                text_list.remove(word)
        for word in text_list:  
            if word=='':
                text_list.remove(word)
        nb_mots+=len(text_list)
    return round(nb_mots/100)*100

#general embed
def gen_embed(title,desc,color):
    embed=discord.Embed(title=title,description=desc,color=color)
    embed.timestamp = datetime.datetime.utcnow() +datetime.timedelta(hours=1)
    embed.set_footer(text='\u200b PluméaBot V3.0',icon_url="https://imgur.com/9hbHaPb.png")
    return embed
    
def read_json(file_name,tab_name):
    file=open(file_name,encoding="utf-8")
    fichier= json.load(file)[tab_name]
    file.close()
    return fichier

def add_element_json(file_name,tab_name,new_element):
    file=open(file_name,encoding="utf-8")
    fichier= json.load(file)
    file.close()
    fichier[tab_name].append(new_element)
    file=open(file_name,'w',encoding="utf-8")
    json.dump(fichier,file,indent=4)
    file.close()

#removes an elementin the file name, in given tab name, 
#The key is the property that will be checked in the file to see if the element must be removed
#element key is the value of the key that will be removed in the file
#returns true if the element was removed, and false if it wasn't in the file
def remove_element_json(file_name,tab_name,key,element_key):
    file=open(file_name,encoding="utf-8")
    fichier= json.load(file)
    file.close()
    removed=False
    for element in fichier[tab_name]:
        if element[key]==element_key:
            removed=True
            fichier[tab_name].remove(element)
    file=open(file_name,'w',encoding="utf-8")
    json.dump(fichier,file,indent=4)
    file.close()
    return removed

'''=================SQL PART=============='''
def connect_to_asra_db():
#establishing the connection
    print("connecting")
    conn = psycopg2.connect(
    database="d8hfuisqkpmpfi", user='trfelrswhvvpxn', password='17be50f4967810a3ba0a1d4c3c547afd84aca6b0dac557dd012131ed72deadde', host='ec2-54-77-120-158.eu-west-1.compute.amazonaws.com', port= '5432')
    #Creating a cursor object using the cursor() method
    conn.autocommit = True
    cursor = conn.cursor()
    cursor.execute("select version()")
    data = cursor.fetchone()
    print("Connection established to: ",data)
    return conn

def connect_to_sql():
    #establishing the connection
    conn = psycopg2.connect(
    database="darcrem5eb4p51", user='mjoinxowwtjafb', password='1de6508882e2b5294c87bc1e83fc833bb8c75b56125fd57ea24d6830e0d5e45d', host='ec2-52-215-68-14.eu-west-1.compute.amazonaws.com', port= '5432')
    #Creating a cursor object using the cursor() method
    conn.autocommit = True
    cursor = conn.cursor()
    cursor.execute("select version()")
    data = cursor.fetchone()
    print("Connection established to: ",data)
    return conn

#creates a sql table
#columns must be like ex: (FIRST_NAME CHAR(20) NOT NULL, LAST_NAME CHAR(20), AGE INT, SEX CHAR(1), INCOME FLOAT)
def create_table(table_name, columns):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    #Doping EMPLOYEE table if already exists.
    command="DROP TABLE IF EXISTS "+table_name
    cursor.execute(command)
    #Creating table as per requirement
    command ="CREATE TABLE "+table_name+columns
    cursor.execute(command)
    print("Table created successfully.")
    conn.commit()
    conn.close()

def delete_table(table_name):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    #Droping EMPLOYEE table
    command="DROP TABLE "+table_name
    cursor.execute(command)
    print("Table removed successfully.")
    conn.commit()
    conn.close()

def retrieve_tables():
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    #Retrieving data
    #cursor.execute('''SELECT * from EMPLOYEE''')
    cursor.execute('''SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = 'BASE TABLE' AND table_name NOT LIKE '%pg_%' AND table_name NOT LIKE '%sql_%' ''')
    result = cursor.fetchall()
    print(result)
    conn.commit()
    conn.close()
    return result

def retrieve_tables_asra():
    #Establishing the connection
    conn = connect_to_asra_db()
    cursor = conn.cursor()
    #Retrieving data
    #cursor.execute('''SELECT * from EMPLOYEE''')
    cursor.execute('''SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = 'BASE TABLE' AND table_name NOT LIKE '%pg_%' AND table_name NOT LIKE '%sql_%' ''')
    result = cursor.fetchall()
    print(result)
    conn.commit()
    conn.close()
    return result

#inserts a new element in table_name, with specified columns
#columns and values must be like (arg1, arg2, ..., argn)
#careful, str must look like 'value'
def insert_data_table(table_name,columns,values):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    #inserting data
    command="INSERT INTO "+table_name+columns+" VALUES "+values
    cursor.execute(command)
    print("data inserted")
    conn.commit()
    conn.close()

#column to change, with given value
#the condition must be like "FIRST_NAME = 'test'"
def update_data_table(table_name,column,value,condition):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    command="UPDATE "+table_name+" SET "+column+"="+value+" Where "+condition
    print(command)
    cursor.execute(command)
    print("data updated")
    conn.commit()
    conn.close()

def remove_data_table(table_name,condition):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    command="DELETE FROM "+table_name+" Where "+condition
    cursor.execute(command)
    print("data removed")
    conn.commit()
    conn.close()

#returns all results in the table name
def retrieve_columns_from_table(table_name):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    #Retrieving data
    command="SELECT column_name FROM information_schema.columns WHERE table_name   = '"+table_name+"'"
    cursor.execute(command)
    result = cursor.fetchall()
    print(result)
    conn.commit()
    conn.close()
    return result

#returns all results in the table name
def retrieve_columns_from_table_asra(table_name):
    #Establishing the connection
    conn = connect_to_asra_db()
    cursor = conn.cursor()
    #Retrieving data
    command="SELECT column_name FROM information_schema.columns WHERE table_name   = '"+table_name+"'"
    cursor.execute(command)
    result = cursor.fetchall()
    print(result)
    conn.commit()
    conn.close()
    return result

#returns all results in the table name
def retrieve_data_from_table(table_name):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    #Retrieving data
    command="SELECT * from "+table_name
    cursor.execute(command)
    result = cursor.fetchall()
    print(result)
    conn.commit()
    conn.close()
    return result

def sql_command (command):
    #Establishing the connection
    conn = connect_to_sql()
    cursor = conn.cursor()
    #Retrieving data
    cursor.execute(command)
    result = cursor.fetchall()
    print("command executed")
    conn.commit()
    conn.close()
    return result

def sql_command_asra (command):
    #Establishing the connection
    conn = connect_to_asra_db()
    cursor = conn.cursor()
    #Retrieving data
    cursor.execute(command)
    result = cursor.fetchall()
    print("command executed")
    conn.commit()
    conn.close()
    return result
