import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'customer' | 'admin'
  createdAt: string
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !data) {
    return null
  }

  return data as User
}

export async function findUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data as User
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const existing = await findUserByEmail(email)
  if (existing) {
    throw new Error('User already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  // Get the count of users for ID generation
  const { count, error: countError } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    throw new Error('Failed to create user')
  }

  const newUser: User = {
    id: String((count || 0) + 1),
    email,
    password: hashedPassword,
    name,
    role: 'customer',
    createdAt: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('users')
    .insert(newUser)
    .select()
    .single()

  if (error) {
    throw new Error('Failed to create user')
  }

  return data as User
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email)
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null

  return user
}

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, role, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return []
  }

  return data.map((u: any) => ({ ...u, password: 'hidden' })) as User[]
}