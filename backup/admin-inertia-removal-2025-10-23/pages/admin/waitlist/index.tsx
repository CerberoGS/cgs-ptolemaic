import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users, Edit, Trash2, Eye } from 'lucide-react';
import { useTrans } from '@/hooks/useTrans';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface WaitlistEntry {
    id: number;
    user_name: string;
    user_email: string;
    plan_type: string;
    plan_label: string;
    plan_icon: string;
    status: string;
    status_label: string;
    notes: string | null;
    contacted_at: string | null;
    converted_at: string | null;
    created_at: string;
}

interface WaitlistStats {
    total_entries: number;
    active_entries: number;
    contacted_entries: number;
    converted_entries: number;
    entries_by_plan: Record<string, number>;
}

interface Props {
    entries: {
        data: WaitlistEntry[];
        links: any[];
        meta: any;
    };
    stats: WaitlistStats;
}

export default function WaitlistIndex({ entries, stats }: Props) {
    const t = useTrans();
    const { locale } = usePage<{ locale: string }>().props;
    const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);
    const [statusUpdate, setStatusUpdate] = useState('');
    const [notesUpdate, setNotesUpdate] = useState('');

    const handleStatusUpdate = (entry: WaitlistEntry) => {
        router.put(`/${locale}/admin/waitlist/${entry.id}/status`, {
            status: statusUpdate,
            notes: notesUpdate,
        }, {
            onSuccess: () => {
                setSelectedEntry(null);
                setStatusUpdate('');
                setNotesUpdate('');
            }
        });
    };

    const handleDelete = (entry: WaitlistEntry) => {
        if (confirm(t('Are you sure you want to delete this waitlist entry?'))) {
            router.delete(`/${locale}/admin/waitlist/${entry.id}`);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'contacted':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'converted':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppLayout>
            <Head title={t('Waitlist Management')} />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('Waitlist Management')}</h1>
                    <p className="text-muted-foreground">
                        {t('Manage waitlist entries and track user interest')}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Total Entries')}</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_entries}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Active Entries')}</CardTitle>
                            <Users className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active_entries}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Contacted Entries')}</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.contacted_entries}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('Converted Entries')}</CardTitle>
                            <Users className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{stats.converted_entries}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Entries by Plan */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Entries by Plan')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            {Object.entries(stats.entries_by_plan).map(([plan, count]) => (
                                <div key={plan} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">
                                            {plan === 'managed' ? '🧭' : plan === 'pro' ? '🔭' : '☀️'}
                                        </span>
                                        <span className="font-medium">
                                            {plan === 'managed' ? 'Cosmógrafo' : 
                                             plan === 'pro' ? 'Astrónomo' : 'Heliópolis'}
                                        </span>
                                    </div>
                                    <Badge variant="secondary">{count}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Waitlist Entries Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Waitlist Entries')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('User Name')}</TableHead>
                                    <TableHead>{t('User Email')}</TableHead>
                                    <TableHead>{t('Plan Type')}</TableHead>
                                    <TableHead>{t('Status')}</TableHead>
                                    <TableHead>{t('Created At')}</TableHead>
                                    <TableHead>{t('Actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entries.data.map((entry) => (
                                    <TableRow key={entry.id}>
                                        <TableCell className="font-medium">{entry.user_name}</TableCell>
                                        <TableCell>{entry.user_email}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span>{entry.plan_icon}</span>
                                                <span>{entry.plan_label}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(entry.status)}>
                                                {entry.status_label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(entry.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedEntry(entry);
                                                                setStatusUpdate(entry.status);
                                                                setNotesUpdate(entry.notes || '');
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{t('Update Status')}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <Label htmlFor="status">{t('Status')}</Label>
                                                                <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="active">{t('Active')}</SelectItem>
                                                                        <SelectItem value="contacted">{t('Contacted')}</SelectItem>
                                                                        <SelectItem value="converted">{t('Converted')}</SelectItem>
                                                                        <SelectItem value="cancelled">{t('Cancelled')}</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="notes">{t('Notes')}</Label>
                                                                <Textarea
                                                                    id="notes"
                                                                    value={notesUpdate}
                                                                    onChange={(e) => setNotesUpdate(e.target.value)}
                                                                    placeholder={t('Add notes about this entry...')}
                                                                />
                                                            </div>
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setSelectedEntry(null);
                                                                        setStatusUpdate('');
                                                                        setNotesUpdate('');
                                                                    }}
                                                                >
                                                                    {t('Cancel')}
                                                                </Button>
                                                                <Button onClick={() => handleStatusUpdate(entry)}>
                                                                    {t('Update Status')}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(entry)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
