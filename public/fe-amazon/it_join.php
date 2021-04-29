<?php
include 'dir/header.php';
?>
<main class="">

    <div class="relative ">
        <div class="absolute z-10 left-0 right-0 top-0 bottom-0 bg-black-30 flex items-center">
            <!-- max-width: 1280px; -->
            <section class=" w-full max-w-screen-xl mx-auto ">
                <h1 class="flex items-center uppercase lg:text-5xl text-2xl mx-4 truncate">
                    <span class="text-white font-semibold font-serif w-full" style="text-shadow: 1px 1px 3px #000;">Free japanese courses</span>
                </h1>
                <!-- button-bg-white-icon -->
                <a href="japanese.php"
                   class="flex items-center justify-center bg-white text-indigo-700 h-10 w-32 rounded-sm border border-indigo-700 hover:bg-indigo-700 hover:text-white mx-4 mt-2"
                >
                    <i class="material-icons">arrow_back</i>
                    <span class="uppercase ml-2">back</span>
                </a>
            </section>
        </div>
        <!-- image-pb-6x1 -->
        <figure class="lg:block hidden">
            <div class="w-full">
                <div class="pb-6x1 relative overflow-hidden bg-gray-300">
                    <img
                            alt=""
                            src="/fe-amazon/assets/images/spirit-of-japan-banner 2.jpg"
                            class="absolute h-full w-full object-cover"/>
                </div>
            </div>
        </figure>
        <!-- image-pb-6x1 -->
        <figure class="lg:hidden block">
            <div class="w-full">
                <div class="pb-3x1 relative overflow-hidden bg-gray-300">
                    <img
                            alt=""
                            src="/fe-amazon/assets/images/spirit-of-japan-banner 2.jpg"
                            class="absolute h-full w-full object-cover"/>
                </div>
            </div>
        </figure>
    </div>


    <!-- max-width: 1280px; -->
    <div class="w-full max-w-screen-xl mx-auto flex lg:px-4 px-4 ">
        <div class="lg:block hidden mt-6 w-64">
            <h3 class="flex items-center text-lg uppercase lg:mx-0 mx-2">
                <i class="material-icons text-4xl text-gray-400">public</i>
                <span class="pl-2 pb-1 border-b w-full">Japanese</span>
            </h3>
            <ul class="mt-3">
                <?php
                foreach ($japanese as $key => $item) {?>
                <li class="">
                    <a href="#" class="block py-2 px-3 <?= !$key ? 'bg-indigo-700 text-white' : 'hover:underline hover:text-indigo-700' ?>">
                        <?= $item['title'] ?>
                    </a>
                </li>
                <?php }
                ?>
            </ul>

        </div>
        <div class="lg:pl-5 w-full">
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <!-- grid -->
                <div class="grid grid-cols-12 gap-4">
                    <div class="lg:col-span-8 col-span-12 lg:mt-6 mt-4 ">
                        <h3 class="text-2xl font-semibold">Register : <span class="text-gray-600">Free japanese courses</span></h3>
                        <form action="/" class="p-2 bg-yellow-200 mt-3 block">
                            <!-- input-border -->
                            <label class="block ">
                                <span class="block">Full Name</span>
                                <input
                                    type="text"
                                    class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                                    placeholder="Join Henry"
                                />
                            </label>
                            <!-- input-border -->
                            <label class="block mt-3">
                                <span class="block">Gender</span>
                                <div class="mt-1 -mx-2">
                                    <!-- button-bg-blue-text-icon -->
                                    <button
                                        type="button"
                                        class="bg-transparent h-8 px-2 rounded hover:opacity-75 flex items-center focus:outline-none"
                                    >
                                        <i class="material-icons">radio_button_unchecked</i>
                                        <span class="ml-2">Male</span>
                                    </button>
                                    <!-- button-bg-blue-text-icon -->
                                    <button
                                        type="button"
                                        class="bg-transparent h-8 px-2 rounded hover:opacity-75 flex items-center focus:outline-none"
                                    >
                                        <i class="material-icons">radio_button_unchecked</i>
                                        <span class="ml-2">Female</span>
                                    </button>
                                </div>
                            </label>
                            <!-- input-border -->
                            <label class="block mt-3">
                                <span class="block">Birthday</span>
                                <input
                                    type="date"
                                    class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                                    placeholder="11/11/1992"
                                />
                            </label>
                            <!-- input-border -->
                            <label class="block mt-3">
                                <span class="block">Phone</span>
                                <input
                                    type="tel"
                                    class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                                    placeholder="11/11/1992"
                                />
                            </label>
                            <!-- input-border -->
                            <label class="block mt-3">
                                <span class="block">Email</span>
                                <input
                                    type="email"
                                    class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                                    placeholder="abc@abc"
                                />
                            </label>
                            <!-- input-border -->
                            <label class="block mt-3">
                                <span class="block">Major</span>
                                <input
                                    type="text"
                                    class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                                    placeholder="Enter here.."
                                />
                            </label>
                            <!-- button-bg-white -->
                            <a href="japanese_register_next.php"
                                class="bg-gray-200 text-indigo-700 h-10 w-full rounded hover:opacity-75 border border-indigo-700 mt-4 flex items-center justify-center"
                            >
                                <i class="material-icons">arrow_forward</i>
                                <span class="uppercase ml-3">next</span>
                            </a>

                        </form>
                    </div>
                    <div class="lg:col-span-4 col-span-12 lg:mt-6 mt-0">
                        <h3 class="text-2xl font-semibold pt-3 border-t lg:hidden block">Prices</h3>
                        <ul class="sticky top-0 pt-4">
                            <li class="flex items-center">
                                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                    <i class="material-icons text-3xl text-indigo-700">book</i>
                                </div>
                                <div class="ml-3">
                                    <div class="text-xl">Expert instruction</div>
                                    <div class="text-gray-600">3 high-quality courses</div>
                                </div>
                            </li>
                            <li class="flex items-center mt-5">
                                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                    <i class="material-icons text-3xl text-indigo-700">person</i>
                                </div>
                                <div class="ml-3">
                                    <div class="text-xl">Self-paced</div>
                                    <div class="text-gray-600">Progress at your own speed</div>
                                </div>
                            </li>
                            <li class="flex items-center mt-5">
                                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                    <i class="material-icons text-3xl text-indigo-700">query_builder</i>
                                </div>
                                <div class="ml-3">
                                    <div class="text-xl">4 months</div>
                                    <div class="text-gray-600">3 - 5 hours per week</div>
                                </div>
                            </li>
                            <li class="flex items-center mt-5">
                                <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                    <i class="material-icons text-3xl text-indigo-700">payments</i>
                                </div>
                                <div class="ml-3">
                                    <div class="text-xl">
                                        $0
                                        <span class="line-through ml-2">$222.30</span> USD
                                    </div>
                                    <div class="text-gray-600">For the full program experience</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


        </div>
    </div>
</main>
<?php
include 'dir/footer.php';
?>