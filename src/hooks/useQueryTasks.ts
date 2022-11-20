import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Task } from '@prisma/client';

import { axios } from '@/lib/axios';

const sleep = (ms: number): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const useQueryTasks = () => {
  const router = useRouter();

  const getTasks = async () => {
    const { data } = await axios.get<Task[]>('/todo');
    // await sleep(5000);
    return data;
  };

  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    onError: (error: any) => {
      // if (error.response.status === 401 || error.response.status === 403)
      router.push('/');
    },
  });
};
