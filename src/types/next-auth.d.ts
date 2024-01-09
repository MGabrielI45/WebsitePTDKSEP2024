import NextAuth from "next-auth"

declare module 'react-notifications';

declare module "next-auth" {
    interface User{
        name: string,
        image: string
    }
  interface Session {
    user: User &{
        name: string,
        image: string
    }
    token: {
        name: string,
        image: string
    }
  }
}