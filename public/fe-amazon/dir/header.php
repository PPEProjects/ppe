<?php
include 'data.php'
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Japanese</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <link rel="stylesheet" href="assets/css/tailwind-output.css"/>
    <!-- production -->
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.3.5/dist/alpine.min.js" defer></script>
</head>

<body>
<header class="">
    <section class="bg-gray-900 h-16 flex items-center justify-between lg:px-4 " x-data="{ open: '' }">
        <div class="w-64 flex items-center">
            <!-- image-pb-8x5 -->
            <a href="index.php" class="hover:border-white border border-transparent px-2 py-1 leading-6">
                <h3 class="text-3xl font-semibold"><span class="text-blue-400">P</span><span
                        class="text-red-500">P</span><span
                        class="text-purple-500">E</span></h3>
                <h4 class="whitespace-no-wrap -mb-1 font-thin text-gray-200">
                    <span class="text-blue-400">Paracel</span> <span class="text-red-500">Project</span> <span
                        class="text-purple-500">Education</span>
                </h4>
            </a>
        </div>
        <div class="fixed top-0 left-0 bottom-0 right-0 bg-white z-20"
             x-show="open === 'mobile'"
             @click.away="open = ''"
             style="display: none">
            <section class="bg-gray-900 h-16 flex items-center justify-between lg:px-4 ">
                <div class="w-64 flex items-center">
                    <!-- image-pb-8x5 -->
                    <a href="index.php" class="hover:border-white border border-transparent px-2 py-1 leading-6">
                        <h3 class="text-3xl font-semibold"><span class="text-blue-400">P</span><span
                                    class="text-red-500">P</span><span
                                    class="text-purple-500">E</span></h3>
                        <h4 class="whitespace-no-wrap -mb-1 font-thin text-gray-200">
                            <span class="text-blue-400">Paracel</span> <span class="text-red-500">Project</span> <span
                                    class="text-purple-500">Education</span>
                        </h4>
                    </a>
                </div>
                <!-- button-bg-blue-icon -->
                <button type="button"
                        @click="open = ''"
                        class="lg:hidden flex mr-2 items-center justify-center bg-transparent text-white h-12 px-3 rounded-sm hover:opacity-75 hover:border-white border border-transparent ">
                    <i class="material-icons">close</i>
                </button>
            </section>
            <section class="">
                <h3 class="text-xl mx-3 py-3">Language</h3>
                <ul class="">
                    <?php foreach($languages as $key => $val){?>
                        <li class="">
                            <!-- image-pb-1x1 -->
                            <a href="#" class="flex items-center py-3 px-3 hover:opacity-75 border-t <?= $key ? '' : 'text-indigo-700' ?>">
                                <div class="w-6">
                                    <div class="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                        <img
                                                alt=""
                                                src="<?= $val['image'] ?>"
                                                class="absolute h-full w-full object-cover"/>
                                    </div>
                                </div>
                                <figcaption class="ml-2"><?= $val['name'] ?></figcaption>
                            </a>
                        </li>
                    <?php }?>
                </ul>
            </section>
            <section class="">
                <h3 class="text-xl mx-3 py-3">Account</h3>
                <ul class="">
                    <?php foreach(['login.php'=>'Sign-in', 'register.php'=>'Create account'] as $link => $val){?>
                        <li class="">
                            <!-- image-pb-1x1 -->
                            <a href="<?= $link ?>" class="flex items-center py-3 px-3 hover:opacity-75 border-t ">
                                <?= $val ?>
                            </a>
                        </li>
                    <?php }?>
                </ul>
            </section>
        </div>
        <!-- button-bg-blue-icon -->
        <button type="button"
                @click="open = 'mobile'"
                class="lg:hidden flex mr-2 items-center justify-center bg-transparent text-white h-12 px-3 rounded-sm hover:opacity-75 hover:border-white border border-transparent ">
            <i class="material-icons">menu</i>
        </button>
        <div class="lg:flex hidden relative" x-data="{ open: '' }">
            <!-- open language -->
            <ul
                x-show="open === 'language'"
                @click.away="open = ''"
                style="display: none"
                class="w-64 border shadow-md rounded-md mt-16 bg-white arrow arrow-left-2 absolute z-10 top-0 left-0 -ml-2 ">
                <?php foreach($languages as $key => $val){?>
                    <li class="">
                        <!-- image-pb-1x1 -->
                        <a href="#" class="flex items-center py-3 px-3 hover:opacity-75 <?= $key ? 'border-t' : '' ?>">
                            <div class="w-6">
                                <div class="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                    <img
                                        alt=""
                                        src="<?= $val['image'] ?>"
                                        class="absolute h-full w-full object-cover"/>
                                </div>
                            </div>
                            <figcaption class="ml-2"><?= $val['name'] ?></figcaption>
                        </a>
                    </li>
                <?php }?>
            </ul>
            <!-- button-bg-blue-icon -->
            <button type="button"
                    @click="open = 'language'"
                    class="bg-transparent text-white h-12 px-2 rounded-sm hover:opacity-75 flex items-center justify-center hover:border-white border border-transparent ">
                <!-- image-pb-1x1 -->
                <figure class="flex items-center">
                    <div class="w-6">
                        <div class="pb-4x3 relative rounded-sm overflow-hidden bg-gray-300">
                            <img alt="" src="/fe-amazon/assets/images/flags/united-kingdom.png"
                                 class="absolute h-full w-full object-cover"/>
                        </div>
                    </div>
                </figure>
                <i class="material-icons ml-2">arrow_drop_down</i>
            </button>

            <!-- open sign-in -->
            <section
                    x-show="open === 'sign-in'"
                    @click.away="open = ''"
                    style="display: none"
                    class="w-screen max-w-lg border shadow-md rounded-md mt-16 bg-white arrow arrow-right-05 absolute z-10 top-0 right-0 mr-32 py-3 ">
                <div class="text-center">
                    <!-- button-bg-blue -->
                    <a href="login.php"
                        class="bg-blue-500 text-white h-10 w-32 rounded hover:opacity-75 flex items-center justify-center mx-auto"
                    >
                        <span class="">Sign in</span>
                    </a>
                    <a href="register.php" class="block text-indigo-700 hover:underline mt-3">
                        <span class="text-black">New customer?</span> Start here.
                    </a>
                </div>
                <div class="flex text-sm leading-7 mx-3 mt-3 border-t ">
                    <div class="w-1/2 pt-3">
                        <h4 class="font-bold text-lg">Your Lists</h4>
                        <ul class="mt-3">
                            <?php
                            $arr = ['Create a Wish List', 'Find a Wish List', 'Find a Gift', 'Explore Showroom'];
                            foreach ($arr as $item) { ?>
                                <li class="">
                                    <a href="#" class="hover:text-indigo-700 hover:underline"><?= $item ?></a>
                                </li>
                                <?php } ?>
                        </ul>
                    </div>
                    <div class="w-1/2 pt-3 border-l pl-3">
                        <h4 class="font-bold text-lg">Your Account</h4>
                        <ul class="mt-3">
                            <?php
                            $arr = ['Your Account', 'Your Orders', 'Your Wish List', 'Your Recommendations', 'Your Subscribe & Save Items',
                                'Memberships & Subscriptions', 'Your Prime Membership', 'Register for a Business Account', 'Your Watchlist'];
                            foreach ($arr as $item) { ?>
                                <li class="">
                                    <a href="#" class="hover:text-indigo-700 hover:underline"><?= $item ?></a>
                                </li>
                                <?php } ?>
                        </ul>
                    </div>
                </div>
            </section>
            <!-- button-bg-blue-icon -->
            <button type="button"
                    @click="open = 'sign-in'"
                    class="bg-transparent text-white h-12 px-2 rounded-sm hover:opacity-75 hover:border-white border border-transparent ml-3 ">
                <span class="block text-left text-sm text-gray-300">Hello, Sign in</span>
                <span class="flex -mt-1">
                        <span class="">Account & Lists</span>
                        <i class="material-icons ml-1">arrow_drop_down</i>
                    </span>
            </button>
            <!-- button-bg-blue-icon -->
            <button type="button"
                    class="flex items-center justify-center bg-transparent text-white h-12 px-2 rounded-sm hover:opacity-75 hover:border-white border border-transparent ml-3 ">
                <i class="material-icons ml-1">signal_cellular_alt</i>
            </button>
        </div>
    </section>
    <section class="bg-gray-800 h-8 flex items-center lg:px-4 ">
        <div class="w-64 items-center lg:flex hidden">
        </div>
        <ul class="">
            <?php
            foreach ($categories as $key => $category) {
                $file = str_replace(' ', '_', strtolower($category));
                ?>
                <li class="align-top inline <?= $key ? 'ml-3' : '' ?>">
                    <a href="<?= "{$file}.php" ?>" class="text-gray-200 px-2 py-1 hover:border-white border border-transparent">
                        <?= $category ?>
                    </a>
                </li>
            <?php }
            ?>
        </ul>
    </section>
</header>