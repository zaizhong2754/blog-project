import { Card } from 'antd'
import {
  LockOutlined,
  UserOutlined,
  SecurityScanOutlined
} from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import styles from './login.module.scss'

const Login = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="h-[480px] w-[400px] p-2">
        <h1 className="text mb-6 text-center text-2xl font-bold">Blog Admin</h1>

        <Form
          className={styles['login-form']}
          name="normal_login"
          initialValues={{ remember: true }}
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <Input
              className={styles.code}
              prefix={<SecurityScanOutlined className="site-form-item-icon" />}
              addonAfter={
                <div className={styles['validate-pic']}>
                  <img src="/src/assets/react.svg" alt="" />
                </div>
              }
              placeholder="验证码"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
