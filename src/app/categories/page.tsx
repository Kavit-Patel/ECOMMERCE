"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { trpc } from "~/utils/trpc";

const Categories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const uid = searchParams.get("uid") ?? "";
  const autoLoginCalled = useRef(false);
  const [userId, setUserId] = useState<string>(uid);

  const cookieLoginMutation = trpc.user.cookieLogin.useMutation({
    onSuccess: (data) => {
      setUserId(data.user.id);
    },
    onError: (err) => {
      console.error("Error during login", err);
      router.push("/login");
    },
  });

  useEffect(() => {
    if (!autoLoginCalled.current) {
      autoLoginCalled.current = true;
      void cookieLoginMutation.mutateAsync();
    }
  }, [cookieLoginMutation]);

  useEffect(() => {
    if (from) {
      router.replace("/categories");
    }
  }, [router, from]);

  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data, isLoading, isError } = trpc.category.getAllCategories.useQuery({
    userId,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    if (data) {
      setCategories(data.allCategories);
      setSelectedCategories(data.selectedCategoryIds || []);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const saveCategoriesMutation = trpc.category.saveUserCategories.useMutation();

  const handleCategoryChange = async (id: number) => {
    const newSelectedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];

    setSelectedCategories(newSelectedCategories);

    try {
      await saveCategoriesMutation.mutateAsync({
        userId,
        categoryIds: newSelectedCategories,
      });
    } catch (error) {
      console.error("Error saving categories:", error);
      alert("Failed to save categories.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-4 flex w-full items-center justify-center">
      <div className="flex min-h-[28rem] w-[95%] flex-col gap-3 rounded-2xl border border-[#C1C1C1] p-10 md:w-[50%]">
        <h2 className="w-full pb-3 text-center text-xl md:text-3xl">
          Please mark your interests!
        </h2>
        <p className="text-center text-xs md:text-sm">
          We will keep you notified.
        </p>
        <div className="flex h-[20rem] flex-col gap-2 p-4">
          <p className="pb-2">My saved interests!</p>
          <div className="flex flex-col justify-start gap-1">
            {isLoading ? (
              <div className="flex h-24 w-full items-center justify-start">
                Loading...
              </div>
            ) : isError ? (
              <div className="flex h-24 w-full items-center justify-start">
                Error Loading categories...
              </div>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="p-01 w-full">
                  <div className="rounded border">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="h-5 w-5 text-black checked:border-black checked:bg-black focus:ring-black"
                      />
                      <span>{category.name}</span>
                    </label>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-auto flex justify-center space-x-2">
            {totalPages > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`rounded border px-4 py-2 ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-white text-black"}`}
                >
                  {"<<"}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`rounded border px-4 py-2 ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-white text-black"}`}
                >
                  {"<"}
                </button>
                {Array.from(
                  { length: Math.min(totalPages, 6) },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`rounded border px-4 py-2 ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                  >
                    {page}
                  </button>
                ))}
                {totalPages > 6 && (
                  <span className="rounded border bg-white px-4 py-2 text-black">
                    ...
                  </span>
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`rounded border px-4 py-2 ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-white text-black"}`}
                >
                  {">"}
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`rounded border px-4 py-2 ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-white text-black"}`}
                >
                  {">>"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 w-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <Categories />
    </Suspense>
  );
};

export default CategoriesPage;
