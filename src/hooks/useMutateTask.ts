import { useRouter } from 'next/router';
import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Task } from '@prisma/client';
import useStore from '@/store';
import { EditedTask } from '@/types';

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = useMutation(
    async (task: Omit<EditedTask, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/todo`,
        task
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        // MEMO: 現在のキャッシュデータを取得する
        const prevTodos = queryClient.getQueryData<Task[]>(['tasks']);
        // MEMO: 現在のキャッシュデータを更新する
        if (prevTodos) {
          queryClient.setQueryData(['tasks'], [res, ...prevTodos]);
        }
        // MEMO: グローバルステートをリセット
        reset();
      },
      onError: (error: any) => {
        reset();
        if (error.response.status === 401 || error.response.status === 403)
          router.push('/');
      },
    }
  );

  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`,
        task
      );
      return res.data;
    },
    {
      onSuccess: (res, variables) => {
        const prevTodos = queryClient.getQueryData<Task[]>(['tasks']);
        if (prevTodos) {
          queryClient.setQueryData(
            ['tasks'],
            prevTodos.map((task) => (task.id === res.id ? res : task))
          );
        }
        reset();
      },
      onError: (error: any) => {
        reset();
        if (error.response.status === 401 || error.response.status === 403)
          router.push('/');
      },
    }
  );

  const deleteTaskMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`);
    },
    {
      onSuccess: (_, variables) => {
        const prevTodos = queryClient.getQueryData<Task[]>(['tasks']);
        if (prevTodos) {
          queryClient.setQueryData(
            ['tasks'],
            // 実行関数で受け取った引数をvariablesから取得できる（=今回はid）
            prevTodos.filter((task) => task.id !== variables)
          );
        }
        reset();
      },
      onError: (error: any) => {
        reset();
        if (error.response.status === 401 || error.response.status === 403)
          router.push('/');
      },
    }
  );

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
