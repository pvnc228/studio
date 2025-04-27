
"use client";

import React from 'react';
import { useUserProfile } from '@/context/UserProfileContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Phone, Mail } from 'lucide-react'; // Import icons
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// Define Zod schema for profile form validation
const profileSchema = z.object({
    firstName: z.string().min(1, "Имя обязательно"),
    lastName: z.string().min(1, "Фамилия обязательна"),
    phone: z.string().regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Неверный формат телефона").or(z.literal("")), // Allow empty string
    email: z.string().email("Неверный формат email").or(z.literal("")), // Allow empty string
    birthDate: z.string().optional(), // Make birthDate optional or add validation if needed
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const UserProfilePage = () => {
  const { userProfile, updateUserProfile, loading } = useUserProfile();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      phone: userProfile?.phone || '',
      email: userProfile?.email || '',
      birthDate: userProfile?.birthDate || '',
    },
  });

  // Update form default values when userProfile changes (e.g., after loading)
  React.useEffect(() => {
    if (userProfile) {
      form.reset({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phone: userProfile.phone || '',
        email: userProfile.email || '',
        birthDate: userProfile.birthDate || '',
      });
    }
  }, [userProfile, form]);


  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    updateUserProfile(data);
    // Optionally show a success message/toast
    console.log("Профиль обновлен:", data);
  };

  if (loading) {
      return <div className="p-6 text-center">Загрузка профиля...</div>; // Or a Skeleton loader
  }

  if (!userProfile) {
      return <div className="p-6 text-center">Профиль не найден.</div>; // Handle case where profile is still null after loading
  }

  return (
    <div className="space-y-6 p-1">
      <Card>
        <CardHeader>
          <CardTitle>Личная информация</CardTitle>
          <CardDescription>Обновите свои персональные данные.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Иван" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Фамилия</FormLabel>
                      <FormControl>
                        <Input placeholder="Иванов" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                     <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <FormControl>
                        <Input type="email" placeholder="ivan.ivanov@example.com" {...field} className="pl-10" />
                       </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                         <Input placeholder="+7 999 123 45 67" {...field} className="pl-10" />
                        </FormControl>
                     </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата рождения</FormLabel>
                     <div className="relative">
                       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <FormControl>
                         <Input type="date" {...field} className="pl-10" />
                       </FormControl>
                     </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full md:w-auto">Сохранить изменения</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История поиска</CardTitle>
          <CardDescription>Места, которые вы недавно просматривали.</CardDescription>
        </CardHeader>
        <CardContent>
          {userProfile.searchHistory && userProfile.searchHistory.length > 0 ? (
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <ul className="space-y-4">
                {userProfile.searchHistory.map((place, index) => (
                  <React.Fragment key={`${place.name}-${index}`}>
                    <li className="flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                           src={place.imageUrl || 'https://picsum.photos/40/40'}
                           alt={place.name}
                           width={40}
                           height={40}
                           className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                         />
                         <div className="flex-grow min-w-0">
                           <p className="font-medium truncate text-foreground">{place.name}</p>
                           <p className="text-xs text-muted-foreground capitalize truncate">{place.category}</p>
                         </div>
                       </div>
                       <Button variant="ghost" size="sm" asChild>
                         <a href={place.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                           <MapPin className="h-3.5 w-3.5" />
                           Карта
                         </a>
                       </Button>
                    </li>
                    {index < userProfile.searchHistory.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-muted-foreground text-center py-4">История поиска пуста.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
