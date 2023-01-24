import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const Index = () => {
    return (
        <div>
             <Head>
        <title>Articles | Chowdhury Tafsir Ahmed Siddiki</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <div>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    {/* <Image width={2} height={4} class="w-full" src="/favicon.ico" alt="post image"/> */}
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Title</div>
                        <p class="text-gray-700 text-base">
                            Lorem ipsum dolor sit 
                        </p>
                    </div>
                    <div class="px-6 py-4">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Author Name</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Date </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
