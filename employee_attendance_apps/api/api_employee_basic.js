import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_EMPLOYEE_API_URL,
  headers: {
    Authorization: "Basic " + Buffer.from(process.env.NEXT_PUBLIC_USERNAME_BASIC + ':' + process.env.NEXT_PUBLIC_PASSWORD_BASIC).toString('base64'),
    "Content-Type": "application/json"
  }
});
