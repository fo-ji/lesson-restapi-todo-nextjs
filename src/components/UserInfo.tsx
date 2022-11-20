import { useQueryUser } from '@/hooks/useQueryUser';

export const UserInfo = () => {
  const { data: user } = useQueryUser();

  return <p>{user?.email}</p>;
};
