import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("loggedin");
  let url = req.url;

  if (verify && (url.includes("/auth/signup")) || (url.includes("/auth/login"))) {
    // Change the url to home page in production  
    return NextResponse.redirect('http://localhost:3000/');
  }
}
