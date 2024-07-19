'use server'

// app/api/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export default async function GET(req, res) {
    try {
      const results = await query('SELECT * FROM tbl_student'); // เปลี่ยน 'mytable' เป็นชื่อ table ของคุณ
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }