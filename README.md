# FancyTodo-server

A task management web application aimed at providing a simple and intuitive way of tracking and helping you to achieve your goals. It's not gonna win an award in innovation but it's free so pls try it.

## TODO ROUTES

## Create Task

Store new Task item to the database. Returns json data about that Task item.

**Url:**

/todos

**Method:**

POST

**Request Header:**
{
"token": [string] 
}

**Request Body:**

{

 	"title": [string],

​	"description": [string],

​	"due_date": [date string] 
}

**Response:**
{

​	"id": [integer],

​	"title": [string],

​	"description": [string],

​	"due_date": [date string],

​	"UserId": [integer]
}

## Read Task

Read existing task that belongs to the user currently logged in.

**URL:**
/todos

**Method:**
GET

**Request Header:**
{
"token": [string] 
}

**Request Body:**
None

**Response:**
[
	{ //Task item},
	{//Task item},
	//etc 
]

## Read Task by Id

Find one existing task by its Id and return json data of that task item.

**URL**:
/todos/:id

**Method:**
GET

**Request** **Header**:
{
"token": [string] 
}

**Request Body:**
None

**Response:**
{
	"id": [integer],
	"title": [string],
	"description: [string],
	"due_date": [string date],
	"UserId": [integer] 
}

## Update Task

Modify an existing task item on the database.

**URL**:
/todos/:id

**Method:**
PUT

**Request Header:**
{
"token": [string] 
}

**Request Body:**
{
	"title: [integer],
	"description": [string],
	"due_date": [string date],
}

**Response:**
{
	"id": [integer],
	"title": [string],
	"description: [string],
	"due_date": [string date],
	"UserId": [integer] 
}

## Delete Task

Delete an existing task item on the database.

**URL:**
/todos/:id

**Method:**
DELETE

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
None

**Response**:
{
	"id": [integer],
	"msg": "delete successful"
}

## USER ROUTES

## Register

Create a new user. Will also return a link for the adorable avatar API.

**URL:**
/register

**Method:**
POST

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
{
	"email": [string],
	"password": [string],
}

**Response**:
{
	"id": [integer],
	"email": [string],
	"token": [string],
	"avatar": [string]
}

## Login

Log in an existing user. Will also return a link for the adorable avatar API.

**URL:**
/login

**Method:**
POST

**Request** **Header:**
{
"token": [string]
}

**Request** **Body:**
{
	"email": [string],
	"password": [string],
}

**Response**:
{
	"email": [string],
	"token": [string],
	"avatar": [string]
}