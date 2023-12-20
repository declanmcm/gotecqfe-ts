export type AuthResponse = ReturnType<typeof getDefaultAuthResponse>;
export const getDefaultAuthResponse = () => {
    return { "data": getDefaultAuthUser(),
    error: "none" };
}

export type AuthUser = ReturnType<typeof getDefaultAuthUser>;
export const getDefaultAuthUser = () => {
    return {
        user: getUser(),
        token: "",
        TTL: 0
    };
}

export type User = ReturnType<typeof getUser>;
export const getUser = () => {
    return {
        "id": 0,
        "password": "",
        "last_login": null,
        "is_superuser": false,
        "username": "",
        "email": "",
        "first_name": null as string | null,
        "last_name": null as string | null,
        "create_time": "",
        "update_time": "",
        "profile_pic": "",
        "admin_type": "",
        "problem_permission": "",
        "is_verified": false,
        "is_active": true,
        "is_staff": false,
        "groups": [] as any[],
        "user_permissions": [] as any[],
        "solved_problem": [] as any[]
    };
}

export type UserResponse = ReturnType<typeof getUserList>;
export const getUserList = () => {
    return {
        count: 0,
        data: [] as User[],
        error: "",
        maxpage: 0,
        total: 0
    };
}

export type SubmissionList = ReturnType<typeof getSubmissionList>;
export const getSubmissionList = () => {
    return {
        "data": [] as Submission[],
        "total": 0,
        "maxpage": 0,
        "count": 0,
        "error": ""
    }
}

export type Submission = ReturnType<typeof getSubmission>;
export const getSubmission = () => {
    return {
        "id": 0,
        "problem_title": "",
        "problem_disp_id": "",
        "problem_id": 0,
        "author_name": "",
        "author_id": 0,
        "is_visible": true,
        "submit_time": "",
        "content": "",
        "language": "",
        "verdict": "",
        "output": {},
        "time": 0,
        "memory": 0
    }
}

export type Problem = ReturnType<typeof getProblem>;
export const getProblem = () => {
    return {
        "id": 0,
        "display_id": "",
        "created": "",
        "is_visible": true,
        "author_id": 0,
        "author_name": "",
        "title": "",
        "statement": "",
        "difficulty": "",
        "tags": [
            {
                "id": 0,
                "tag_name": "uncategoriezd"
            }
        ],
        "source": null as string | null,
        "sample_test": [
            {
                "input": "Sample Input 1",
                "output": "Sample Output 1"
            },
            {
                "input": "Sample Input 2",
                "output": "Sample Output 2"
            }
        ],
        "test_zip": null as string | null,
        "time_limit": 1000,
        "memory_limit": 1000,
        "total_submission": 0,
        "correct_submission": 0,
        "statistic_info": {
            "Accepted": 0,
            "Rejected": 0,
            "System Error": 0,
            "Wrong Answer": 0,
            "Compile Error": 0,
            "Runtime Error": 0,
            "Time Limit Exceeded": 0,
            "Memory Limit Exceeded": 0
        }
    };
}

export type ProblemResponse = ReturnType<typeof getProblemList>;
export const getProblemList = () => {
    return {
        count: 0,
        data: [] as Problem[],
        error: "",
        maxpage: 0,
        total: 0
    };
}

export type ExpiredTokenResponse = ReturnType<typeof getExpiredTokenResponse>;
export const getExpiredTokenResponse = () => {
    return {detail: ""};
}