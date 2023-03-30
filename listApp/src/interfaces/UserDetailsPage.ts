import { RouteComponentProps } from "react-router";

export interface UserDetailPageProps extends RouteComponentProps<{
    email: string;
}> {}