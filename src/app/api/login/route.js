import { NextResponse } from "next/server";
import { comparePassword } from '@/lib/auth';
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect();

// app/api/login/route.js
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const res = await pool.query('SELECT * FROM tbl_student WHERE username = $1', [username]);

    if (res.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = res.rows[0];
    const match = await comparePassword(password, user.password);

    if (!match) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // สมมติว่าเราสร้าง JWT สำหรับการล็อกอิน (สามารถใช้ library เช่น jsonwebtoken)
    // ตัวอย่างนี้จะข้ามขั้นตอนการสร้าง JWT เพื่อความง่าย
    return new Response(JSON.stringify({ message: 'Login successful', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
