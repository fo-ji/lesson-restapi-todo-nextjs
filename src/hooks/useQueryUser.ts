import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { User } from '@prisma/client';

import { axios } from '@/lib/axios';

export const useQueryUser = () => {
  const router = useRouter();

  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'hashdPassword'>>('/user');
    return data;
  };

  return useQuery<Omit<User, 'hashdPassword'>, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (error: any) => {
      // if (error.response.status === 401 || error.response.status === 403)
      router.push('/');
    },
  });
};
