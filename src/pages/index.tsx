import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { IconDatabase } from '@tabler/icons';
import { ShieldCheckIcon } from '@heroicons/react/solid';
import { Anchor, TextInput, Button, Group, PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Layout } from '@/components/Layout';
import { AuthForm } from '@/types';

import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No email provided'),
  password: Yup.string()
    .required('No password provided')
    .min(5, 'Password should be min 5 chars'),
});

const Home: NextPage = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async () => {
    try {
      await getCsrfToken();
      if (isRegister) {
        await axios.post('/auth/signup', {
          email: form.values.email,
          password: form.values.password,
        });
      }

      await axios.post('/auth/login', {
        email: form.values.email,
        password: form.values.password,
      });

      form.reset();
      router.push('/dashboard');
    } catch (e: any) {
      console.log({ e });
      storage.clearToken();
    }
  };

  const getCsrfToken = async () => {
    const { data } = await axios.get('/auth/csrf');
    storage.setToken(data.csrfToken);
  };

  return (
    <Layout title="Auth">
      <div style={{ height: 100, width: 100 }}>
        <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt="md"
          id="email"
          label="Email*"
          placeholder="example@test.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          id="password"
          label="Password*"
          placeholder="password"
          description="Must be min 5 char"
          {...form.getInputProps('password')}
        />
        <Group mt="xl" position="apart">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister((prev) => !prev);
            }}
          >
            {isRegister
              ? 'Have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </Layout>
  );
};

export default Home;
