import Connection from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { signinSchema } from "@/lib/signinSchema";

export async function POST(req: Request) {
    const body = await req.json();
    const result = signinSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            { message: "Invalid data" },
            { status: 400 }
        );
    }

    const { email, password } = result.data;

    try {
        await Connection();

        const user = await User.findOne({ email }).select("+password");
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 401 });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return NextResponse.json({ message: "Wrong credentials" }, { status: 401 });
        return NextResponse.json({ message: "Success" });


    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });

    }


}