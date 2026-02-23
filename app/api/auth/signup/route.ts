import Connection from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/signupSchema";

export async function POST(req: Request) {
  const body = await req.json();

  const result = signupSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid data" },
      { status: 400 }
    );
  }
  const { name, email, password } = result.data;

  try {
    await Connection();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully"
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}