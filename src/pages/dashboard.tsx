import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LogoutIcon } from '@heroicons/react/solid';
import { Layout } from '@/components/Layout';
import { UserInfo } from '@/components/UserInfo';
import { useQueryClient } from '@tanstack/react-query';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';

import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    queryClient.removeQueries(['user']);
    queryClient.removeQueries(['tasks']);
    await axios.post('/auth/logout');
    storage.clearToken();
    router.push('/');
  };

  return (
    <Layout title="Task Board">
      <div style={{ height: 100, width: 100 }}>
        <LogoutIcon
          className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
          onClick={logout}
        />
      </div>
      <UserInfo />
      <TaskForm />
      <TaskList />
    </Layout>
  );
};

export default Dashboard;
