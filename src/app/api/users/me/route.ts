import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/src/helpers/tokenData";
import User from "@/src/models/userModel";
import { connect } from "@/src/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if(userId === ""){
            //return NextResponse.json({message: "User not found."}, {status: 400});
            return NextResponse.json({message: "User not found."}, {status: 300});;
        }
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
