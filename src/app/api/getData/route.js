// app/api/route.js
import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect();


//src/app/api/route.js
export async function GET() {
  const res = await pool.query('SELECT * FROM tbl_student');
  return new Response(JSON.stringify(res.rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function POST() {
  return Response.json({
    message: `POST method called`,
  });
}


export async function PUT() {
  return Response.json({
    message: `PUT method called`,
  });
}


export async function DELETE() {
  return Response.json({
    message: `DELETE method called`,
  });
}
// export async function GET(request) {
//   try {
//     const res = await pool.query('SELECT * FROM tbl_student');
//     return new Response(JSON.stringify(res.rows), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }