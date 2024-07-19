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

export async function GET(req, res) {
  try {
    const result = await client.query('SELECT * FROM tbl_student');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}