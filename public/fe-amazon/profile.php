<?php
include 'dir/header.php';
?>
<header class="h-32 bg-gray-200">

</header>
<main class="w-full max-w-screen-xl mx-auto px-4 mt-6">
    <!-- max-width: 1280px; -->
    <!-- grid -->
    <div class="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
        <div class="lg:col-span-4 col-span-12">
            <!-- image-pb-1x1 -->
            <figure class="-mt-24">
                <div class="w-32">
                        <div class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300  border-white border">
                            <img
                                alt=""
                                src="https://i.pravatar.cc/300"
                                class="absolute h-full w-full object-cover"/>
                    </div>
                </div>
            </figure>
            <h1 class="text-3xl">Naoko Kinoshita</h1>
            <p class="">Associate Professor at PPE</p>

            <!-- image-pb-16x9 -->
            <figure class="flex items-center mt-3">
                <div class="w-12">
                    <div class="pb-1x1 relative rounded-sm overflow-hidden ">
                        <img
                                alt=""
                                src="/fe-amazon/assets/images/universities/1.png"
                                class="absolute h-full w-full object-cover"/>
                    </div>
                </div>
                <figcaption class="ml-2">Harvard University</figcaption>
            </figure>
            <ul class="mt-3 pt-3 border-t ">
                <li class="text-sm underline">
                    Areas of expertise
                </li>
                <li class="ml-2">
                    - Japanese language education
                </li>
                <li class="ml-2">
                    - Japanese phonetics and phonology
                </li>
            </ul>
            <ul class="mt-3 pt-3 border-t ">
                <li class="text-sm underline">
                    Social links
                </li>
                <li class="">
                    <!-- button-bg-white-text-icon -->
                    <a href="#"
                        class="text-gray-800 text-indigo-700 flex items-center hover:opacity-75 mt-3"
                    >
                        <i class="material-icons">link</i>
                        <span class="ml-2">https://www.PPE.jp/inst/cjl/</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="lg:col-span-7 col-span-12">
            <section class="">
                <h4 class="text-sm underline">About Me</h4>
                <p class="mt-3">Naoko Kinoshita is currently an associate professor for the Center of Japanese Language at PPE in Tokyo. She attained her Ph.D. from PPE. She has taught Japanese as a second language in universities, companies, and language schools in both Japan and overseas for more than 25 years.</p>
                <p class="mt-3">In 2015 she was awarded the PPE e-teaching award for her part in developing learning materials for beginning learners of Japanese. In 2019 she was awarded the Grand PPE e-teaching award for the development of Japanese pronunciation materials for second language learners and integration of those materials in her classes.</p>
                <p class="mt-3">
                      Her research interests are the acquisition and teaching of second language pronunciation and the development of e-learning materials.
                </p>
            </section>
            <section class="mt-5">
                <h4 class="text-sm underline">Video</h4>

                <!-- image-pb-16x9 -->
                <figure class="mt-3">
                    <div class="w-full">
                        <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                            <iframe class="absolute h-full w-full object-cover" src="https://www.youtube.com/embed/VnBWAFnffv4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </figure>


            </section>
            <section class="mt-5">
                <h4 class="text-sm underline">Courses and Programs taught by Naoko Kinoshita</h4>
                <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">

                <?php
                foreach ($japanese as $key => $item) if($key>2){?>
                    <div class="lg:col-span-4 col-span-12">
                        <a href="japanese.php" class="block p-2  hover:border-blue-500 border border-transparent">
                            <!-- image-pb-1x1 -->
                            <figure class="flex items-center">
                                <div class="w-full">
                                    <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                        <img alt="" src="<?= @$item['images'][0] ?>"
                                             class="absolute h-full w-full object-cover"/>
                                    </div>
                                </div>
                            </figure>
                            <h3 class="truncate-2y text-lg leading-6 mt-2"><?= $item['title'] ?></h3>
                            <p class="truncate-3y font-light text-gray-800 leading-5 mt-2"><?= implode(', ', $item['descriptions']) ?></p>
                            <!-- button-bg-blue -->
                            <button type="button"
                                    class="bg-indigo-700 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3">
                                <span class="">Register</span>
                            </button>
                        </a>
                    </div>
                <?php }
                ?>
                </div>
            </section>
        </div>
    </div>
</main>
<?php
include 'dir/footer.php';
?>