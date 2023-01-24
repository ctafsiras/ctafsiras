import Image from 'next/image';
import React from 'react';

const Index = () => {
    return (
        <div>
            <div>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    {/* <Image width={2} height={4} class="w-full" src="/favicon.ico" alt="post image"/> */}
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Title</div>
                        <p class="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veritatis iusto nobis adipisci ipsam rerum. Modi, qui aliquid tempora eos eveniet totam explicabo consectetur, veritatis perferendis aliquam, animi neque. Eum illum quis unde iste dolorum ea nam nemo cum esse, beatae saepe expedita doloremque dicta sit. Ipsum quam numquam, aliquam tempore ipsam repellat, modi eligendi accusantium magni laborum ut, vel iste dolorum? Molestiae consequatur quisquam laborum enim dolore ipsam dolorem laboriosam? Exercitationem nisi sequi odit assumenda et quos alias labore natus reiciendis nesciunt recusandae, quas modi! Perferendis ad voluptatibus, explicabo, quo, error quis quibusdam dolores accusantium qui praesentium dolorem dignissimos?
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
