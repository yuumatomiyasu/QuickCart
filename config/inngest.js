import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "web-demo" });

// Inngest Function to save user data to adateabase 
export const saveUserData = inngest.createFunction(
    {
        id:`sync-user-from-clerk`
    },
    { event: 'clerk/user.created' },
    async ({event}) => {
        const {id,first_name, last_neme, email_addresses, imag_url} = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_neme,
            imageUrl: imag_url
        }
        await connectDB();
        await User.create(userData);
    }
)

// Inngest Function to log event data
export const syncUserData = inngest.createFunction(
    {
        id:`log-event-data`
    },
    { event: 'clerk/user.created' },
    async ({event}) => {
        const {id,first_name, last_neme, email_addresses, imag_url} = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_neme,
            imageUrl: imag_url
        }
        await connectDB();
        await User.findByIdAndUpdate(id, userData, {upsert: true});
    }
)

// Inngest Function to delete user data from database
export const deleteUserData = inngest.createFunction(
    {
        id:`delete-user-with-clerk`
    },
    { event: 'clerk/user.deleted' },
    async ({event}) => {

        const {id} = event.data;

        await connectDB();
        await User.findByIdAndDelete(id);
    }
)
