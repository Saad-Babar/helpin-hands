import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "yoursecretkey123");

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;

    const protectedPaths = ["/account"];
    const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

    if (!isProtected) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        await jwtVerify(token, SECRET_KEY);
        return NextResponse.next();
    } catch (error) {
        console.error("JWT error:", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
