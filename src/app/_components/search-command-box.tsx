"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { searchAction } from "../_actions/search-action";
import Link from "next/link";

export function SearchCommandBox() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const {
    mutate: search,
    data,
    isPending,
  } = useMutation({
    mutationFn: searchAction,
    onError: () =>
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your search request. Try again please.",
        variant: "destructive",
      }),
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearchInput = (e: FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    if (debouncedSearch) search(debouncedSearch);
  }, [debouncedSearch, search]);

  return (
    <div className="max-w-md w-full">
      <div className="flex gap-2 items-center w-full relative mb-4">
        <Input name="query" onInput={handleSearchInput} />
        {isPending ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : null}
      </div>
      {data?.items && data.items.length > 0 ? (
        <ul className="flex flex-col gap-1 text-sm">
          {data.items.map((item) => (
            <li key={item.name} className="">
              <Link
                href={`/${item.id}`}
                className="text-slate-200 hover:text-slate-500"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
