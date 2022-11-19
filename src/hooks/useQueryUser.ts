import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@prisma/client';

export const useQueryUser = () => {
  const router = useRouter();

  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'hashdPassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`
    );
    return data;
  };

  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (error: any) => {
      if (error.response.status === 401 || error.response.status === 403)
        router.push('/');
    },
  });
};
