export type UserParams = {
    username: string;
    password: string;
}

export type AttendanceParams = {
    userId: number;
    attendance_type: string;
    date: string;
    time_in: string;
    time_out?: string;
    remark?: string;
}

export type UserProfileParams = {
    name: string; 
    dob: string;
    position: string;
    department: string;
    profile_pic?: string;
}

export type LeaveParams = {
    userId: number;
    leave_type: string;
    date_from: string;
    date_to: string;  
    reason: string;
}