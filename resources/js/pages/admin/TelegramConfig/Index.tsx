import { Head, useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useTrans } from '@/hooks/useTrans'
import { useState } from 'react'
import { Bot, Send, Settings, Shield, TestTube } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'

interface TelegramConfig {
  id: number
  bot_token: string | null
  chat_id: string | null
  is_active: boolean
  webhook_url: string | null
  created_at: string
  updated_at: string
}

interface Props {
  config: TelegramConfig
}

export default function TelegramConfigIndex({ config }: Props) {
  const t = useTrans()
  const [testMessage, setTestMessage] = useState('')
  const [testChatId, setTestChatId] = useState('')

  const { data, setData, put, processing, errors, reset } = useForm({
    bot_token: config.bot_token || '',
    chat_id: config.chat_id || '',
    is_active: config.is_active,
  })

  const { post: testPost, processing: testing } = useForm({
    test_chat_id: testChatId,
    test_message: testMessage,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('admin.telegram-config.update'), {
      onSuccess: () => {
        reset()
      },
    })
  }

  const handleTest = (e: React.FormEvent) => {
    e.preventDefault()
    testPost(route('admin.telegram-config.test'), {
      onSuccess: () => {
        setTestMessage('')
        setTestChatId('')
      },
    })
  }

  return (
    <AppLayout>
      <Head title={t('admin.telegram_config.title')} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('admin.telegram_config.title')}</h1>
            <p className="text-muted-foreground">{t('admin.telegram_config.description')}</p>
          </div>
          <Badge variant={config.is_active ? 'default' : 'secondary'} className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            {config.is_active ? t('admin.telegram_config.active') : t('admin.telegram_config.inactive')}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Configuration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                {t('admin.telegram_config.configuration')}
              </CardTitle>
              <CardDescription>
                {t('admin.telegram_config.config_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bot_token">{t('admin.telegram_config.bot_token')}</Label>
                  <Input
                    id="bot_token"
                    type="password"
                    value={data.bot_token}
                    onChange={(e) => setData('bot_token', e.target.value)}
                    placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                    className={errors.bot_token ? 'border-red-500' : ''}
                  />
                  {errors.bot_token && (
                    <p className="text-sm text-red-500">{errors.bot_token}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {t('admin.telegram_config.bot_token_help')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chat_id">{t('admin.telegram_config.chat_id')}</Label>
                  <Input
                    id="chat_id"
                    value={data.chat_id}
                    onChange={(e) => setData('chat_id', e.target.value)}
                    placeholder="123456789"
                    className={errors.chat_id ? 'border-red-500' : ''}
                  />
                  {errors.chat_id && (
                    <p className="text-sm text-red-500">{errors.chat_id}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {t('admin.telegram_config.chat_id_help')}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', checked)}
                  />
                  <Label htmlFor="is_active">{t('admin.telegram_config.enable_alerts')}</Label>
                </div>

                <Button type="submit" disabled={processing} className="w-full">
                  {processing ? t('common.saving') : t('common.save')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                {t('admin.telegram_config.test_configuration')}
              </CardTitle>
              <CardDescription>
                {t('admin.telegram_config.test_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="test_chat_id">{t('admin.telegram_config.test_chat_id')}</Label>
                  <Input
                    id="test_chat_id"
                    value={testChatId}
                    onChange={(e) => setTestChatId(e.target.value)}
                    placeholder="123456789"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('admin.telegram_config.test_chat_id_help')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test_message">{t('admin.telegram_config.test_message')}</Label>
                  <Input
                    id="test_message"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder={t('admin.telegram_config.test_message_placeholder')}
                  />
                </div>

                <Button type="submit" disabled={testing || !config.is_active} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {testing ? t('common.sending') : t('admin.telegram_config.send_test')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Status Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('admin.telegram_config.status')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t('admin.telegram_config.webhook_status')}</Label>
                <div className="flex items-center gap-2">
                  <Badge variant={config.webhook_url ? 'default' : 'secondary'}>
                    {config.webhook_url ? t('admin.telegram_config.configured') : t('admin.telegram_config.not_configured')}
                  </Badge>
                </div>
                {config.webhook_url && (
                  <p className="text-xs text-muted-foreground font-mono">
                    {config.webhook_url}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{t('admin.telegram_config.last_updated')}</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(config.updated_at).toLocaleString()}
                </p>
              </div>
            </div>

            <Separator />

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                {t('admin.telegram_config.security_note')}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

