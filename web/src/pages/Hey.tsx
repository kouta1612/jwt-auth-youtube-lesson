import React from "react";
import {useHeyQuery} from "../generated/graphql";

export const Hey: React.FC = () => {
    const { data, loading, error } = useHeyQuery({
        fetchPolicy: "network-only"
    })

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        console.log(error)
        return <div>error</div>
    }

    if (!data) {
        return <div>no data</div>
    }

    return <div>{data.hey}</div>
}
