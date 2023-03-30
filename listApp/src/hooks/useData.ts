import { useState, useEffect } from "react";

export function useData() {
    const [data, setData] = useState<any[]>([]);

    const loadData = async () => {
        const url = 'https://randomuser.me/api/?&page=1&results=200&seed=devactic';
        const data = await fetch(url);
        const json = await data.json();
        setData(json.results);
    }

    const getUserByEmail = async (email: string) => {
        const url = 'https://randomuser.me/api/?&page=1&results=50&seed=devactic';
        const data = await fetch(url);
        const json = await data.json();

        const user = json.results.filter((item: any) => item.email === email);
        return user[0];
    }

    useEffect(() => {
        loadData();
    }, []);

    return {
        data,
        getUserByEmail,
    };
}