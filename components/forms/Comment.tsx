"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
\import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";


interface Props{
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {
    const pathname = usePathname();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ''
        },
    });
 
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread( 
            threadId, 
            values.thread, 
            JSON.parse(currentUserId), 
            pathname 
        ); 

        form.reset();
    } 
    return (
        <Form {...form}>
            <form
                className='comment-form'
                onSubmit={form.handleSubmit(onSubmit)}
                >
                <FormField
                    control={form.control}
                    name='thread' 
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center gap-3'>
                            <FormLabel>
                                <Image 
                                    src={currentUserImg}
                                    alt="Profile image"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </ FormLabel>
                            <FormControl className="border-none bg-transparent ">
                                <Input
                                    type="text"
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn">
                    Replay
                </Button>
            </form>
        </Form>
    );
}

export default Comment;