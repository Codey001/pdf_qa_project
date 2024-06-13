
# PDF Ques & Ans

This is a project build in order to ease the hassle of the students, teacher and researchers who find it difficult to exactly pin point the specific aritcle, page or line where specific data is located.

This project helps the users to upload the PDF file and then ask question related to that pdf and all the answers will be in context to the uploaded document.




## API Reference

All the data is fetched from https://pdf-qa-backend.onrender.com/ endpoint.

#### Upload the document

```http
  POST /uploadfile/
```

| Parameter | Requested body     | Description                |    
| :-------- | :------- | :------------------------- |
| `No parameters` | `string(binary)` | **Required**. PDF file |

### Response
{
    "status_code" : "your_status_code",
    "filename" : "your_file_name"
}


#### Get the answer

```http
  GET /ask/
```

| Parameter | Requested body     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `No parameters`      | `{"filename" : "string", "question" : "string"}` | **Required**. Name of the file and question you want to ask |

### Response
{
    "answer" : "answer_to_your_question"
}


## Demo

Project is live at https://qa-frontend-theta.vercel.app/

![Screenshot 2024-06-13 213437](https://github.com/Codey001/qa_frontend/assets/97532891/41a24eef-deda-40e1-9f8b-9fd6acea14f4)



## Installation

Install project with npm

```bash
  cd project
  npm install 
  
  npm run dev
```
    
