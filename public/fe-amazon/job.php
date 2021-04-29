<?php
include 'dir/header.php';
?>
<main class="">
    <!-- max-width: 1280px; -->
    <!-- grid -->
    <div class="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
        <div class="col-span-12">
            <!-- slider settup -->
            <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
            <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>

            <!-- slider dots -->
            <style>
                .flickity-page-dots {
                    bottom: 10px;
                }
                .flickity-page-dots .dot {
                    border: solid 1px #fff;
                }
                .flickity-page-dots .dot.is-selected{
                    background: white;
                }
            </style>
            <div class="main-carousel p-2 bg-gray-100" data-flickity='{ "prevNextButtons": true, "groupCells": true }'>
                <?php for($i=1; $i<=10; $i++){?>
                    <!-- image 4x1 -->
                    <a href="/fe-amazon/assets/images/offices/<?= $i ?>.jpg" target="_blank" class="flex items-center carousel-cell w-56 <?= $i == 1 ? '' : 'ml-3' ?>" >
                        <div class="w-full">
                            <div class="pb-1x1 relative overflow-hidden bg-gray-300">
                                <img
                                    alt=""
                                    src="/fe-amazon/assets/images/offices/<?= $i ?>.jpg"
                                    class="absolute h-full w-full object-cover">
                            </div>
                        </div>
                    </a>
                <?php }?>
            </div>
        </div>
        <div class="lg:col-span-3 col-span-12">
            <div class="sticky top-0 p-3 pt-4 bg-red-100">
                <!-- image-pb-1x1 -->
                <figure class="">
                    <div class="w-full">
                        <div class="pb-3x1 relative rounded-sm overflow-hidden bg-gray-300">
                            <img
                                alt=""
                                src="/fe-amazon/assets/images/japan-companies/5.png"
                                class="absolute h-full w-full object-cover"/>
                        </div>
                    </div>
                    <figcaption class="">
                        <h3 class="text-xl mt-3 ">Saigon Technology Solutions</h3>
                        <p class="text-gray-600 leading-5 mt-2">
                            A fast growing software development company in Viet Nam.
                        </p>
                    </figcaption>
                </figure>

                <ul class="mt-3 lg:block hidden">
                    <?php
                    foreach ($job_tabs as $key => $item) {?>
                        <li class="mt-1">
                            <!-- button-bg-white-text-icon -->
                            <button
                                    type="button"
                                    class="text-gray-800 h-10 w-full rounded border border-transparent flex items-center px-2"
                            >
                                <i class="material-icons"><?= $item['icon'] ?></i>
                                <span class="ml-3"><?= $item['title'] ?></span>
                            </button>
                        </li>
                    <?php }?>
                </ul>
            </div>
        </div>
        <div class="lg:col-span-9 col-span-12 ">
            <!-- max-width: 1280px; -->
            <div class="grid grid-cols-12 gap-4">
                <div class="lg:col-span-8 col-span-12 ">
                    <section class="">
                        <h1 class="text-3xl">Mid/Sr. Mobile Developer (Android, iOS)</h1>
                        <div class="mt-2">
                            <a href="#" class="uppercase text-sm border px-2 py-1 text-gray-700 hover:border-red-600 hover:text-red-700">Android</a>
                            <a href="#" class="uppercase text-sm border px-2 py-1 text-gray-700 hover:border-red-600 hover:text-red-700 ml-1">IOS</a>
                        </div>
                        <div class="">
                            <!-- button-bg-white-text-icon -->
                            <button
                                type="button"
                                class="bg-transparent text-gray-800 h-10 flex items-center justify-center mt-3 focus:outline-none"
                            >
                                <i class="material-icons">location_on</i>
                                <span class="ml-2">2 Nguyen The Loc, Ward 12, Tan Binh, Ho Chi Minh</span>
                            </button>
                            <!-- button-bg-white-text-icon -->
                            <button
                                type="button"
                                class="bg-transparent text-gray-800 h-10 flex items-center justify-center focus:outline-none"
                            >
                                <i class="material-icons">date_range</i>
                                <span class="ml-2">1 day ago</span>
                            </button>
                        </div>
                        <!-- button-bg-blue-text-icon -->
                        <button
                                type="button"
                                class="bg-red-600 text-white h-12 w-full rounded-sm hover:opacity-75 flex items-center justify-center mt-2"
                        >
                            <i class="material-icons">arrow_forward</i>
                            <span class="ml-2 uppercase font-semibold">apply now</span>
                        </button>
                    </section>
                    <section class="">
                        <h3 class="text-2xl font-semibold mt-4">Top 3 Reasons To Join Us</h3>
                        <ul class="leading-7 mt-3">
                            <li class="">Technical training sessions(internal – external)</li>
                            <li class="">Attractive salary and benefits</li>
                            <li class="">Healthcare insurance</li>
                        </ul>
                    </section>
                    <section class="mt-6">
                        <h3 class="text-2xl font-semibold ">Job Description</h3>
                        <?php
                        foreach($jobs[0]['descriptions'] as $key => $val){?>
                            <p class="mt-3 ml-3 <?= $key<1 ? 'text-gray-600' : '' ?>">&bull; <?= $val ?></p>
                        <?php }?>
                    </section>
                    <section class="mt-6">
                        <h3 class="text-2xl font-semibold ">Skills</h3>
                        <?php
                        foreach($jobs[0]['skills'] as $key => $val){?>
                            <p class="mt-3 ml-3 <?= $key<1 ? 'text-gray-600' : '' ?>">&bull; <?= $val ?></p>
                        <?php }?>
                    </section>
                    <section class="mt-6">
                        <h3 class="text-2xl font-semibold ">Nice to haves</h3>
                        <?php
                        foreach($jobs[0]['skills'] as $key => $val){?>
                            <p class="mt-3 ml-3 <?= $key<1 ? 'text-gray-600' : '' ?>">&bull; <?= $val ?></p>
                        <?php }?>
                    </section>
                    <section class="mt-6">
                        <h3 class="text-2xl font-semibold ">Love working heres</h3>
                        <?php
                        foreach($jobs[0]['skills'] as $key => $val){?>
                            <p class="mt-3 ml-3 <?= $key<1 ? 'text-gray-600' : '' ?>">&bull; <?= $val ?></p>
                        <?php }?>
                    </section>
                </div>
                <div class="lg:col-span-4 col-span-12 ">
                    <section class="mt-1 bg-gray-200 py-3 px-3">
                        <h3 class="text-2xl leading-8">Overall Rating <span class="text-gray-600">Saigon Technology Solutions</span></h3>
                        <div class="flex items-center mt-4">
                            <div class="flex ">
                            <?php for($i=1; $i<=5; $i++){?>
                                <!-- button-bg-blue-icon -->
                                <button
                                        type="button"
                                        class=" bg-blue-500 text-white h-10 w-10 rounded hover:opacity-75 flex items-center justify-center <?= $i==1 ? '' : 'ml-2' ?>"
                                >
                                    <i class="material-icons">star</i>
                                </button>
                            <?php }?>
                            </div>
                            <h3 class="ml-2 text-blue-600 text-xl">4.4</h3>
                        </div>
                    </section>
                    <section class="mt-5 bg-gray-200 py-3 px-3">
                        <h3 class="text-2xl leading-8 font-light">Top reviews</h3>
                        <ul class="">
                            <?php for($i=1; $i<=5; $i++){?>
                            <li class="mt-3 pt-3 border-t border-white">
                                <h3 class="text-xl leading-6">''Benefit and environment are on top of VN market''</h3>
                                <div class="flex mt-2">
                                    <?php for($i1=1; $i1<=5; $i1++){?>
                                        <!-- button-bg-blue-icon -->
                                        <button
                                            type="button"
                                            class=" bg-blue-500 text-white h-4 w-4 rounded-sm hover:opacity-75 flex items-center justify-center <?= $i==1 ? '' : 'ml-1' ?>"
                                        >
                                            <i class="material-icons text-xs">star</i>
                                        </button>
                                    <?php }?>
                                </div>
                                <p class="mt-2">
                                    Working for environment and co-workers are very friendly. </p>
                            </li>
                            <?php }?>
                        </ul>
                    </section>
                </div>
            </div>
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto mt-8 ">
                <h3 class="flex items-center text-2xl uppercase lg:mx-0 ">
                    <span class="pl-2 pb-1 font-light w-full">Another jobs</span>
                </h3>
            </section>

            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <!-- grid -->
                    <?php foreach ($jobs as $key => $job) if($key > 3){  ?>
                        <a href="job.php" class="grid grid-cols-12 gap-4 p-3 mt-4 rounded-sm border border-transparent shadow-lg pb-4 hover:border-red-300 hover:shadow-xl">
                            <div class="lg:col-span-10 col-span-8">
                                <h4 class="truncate-2y text-xl leading-6 text-red-600"><?= $job['title'] ?></h4>
                                <div class="text-sm ">
                                    <div class="uppercase flex mt-1 truncate">
                                        <span class="text-gray-500 "><?= $job['company'] ?></span>
                                        <button class="flex items-center justify-center rounded-sm font-semibold bg-gray-200 px-2 ml-2 <?= $job['type']=='Full Time' ? 'text-blue-600' : '' ?> ">
                                            <span class=""><?= $job['type'] ?></span>
                                        </button>
                                    </div>
                                    <div class="flex items-center text-gray-600 mt-3 truncate">
                                        <i class="material-icons text-lg">add_location_alt</i>
                                        <span class="ml-1"><?= $job['location'] ?></span>
                                    </div>
                                    <div class="flex items-center mt-1 truncate">
                                        <i class="material-icons text-lg">style</i>
                                        <span class="ml-1"><?= implode(', ', $job['categories']) ?></span>
                                    </div>
                                    <div class="flex items-center mt-1 text-red-600 truncate">
                                        <i class="material-icons text-lg">attach_money</i>
                                        <span class="ml-1"><?= $job['salary'] ?></span>
                                    </div>
                                </div>
                            </div>
                            <div class="lg:col-span-2 col-span-4 ">
                                <!-- image-pb-1x1 -->
                                <figure class="">
                                    <div class="w-full">
                                        <div class="pb-3x1 relative rounded-sm overflow-hidden bg-gray-300">
                                            <img
                                                alt=""
                                                src="<?= $job['images'][0] ?>"
                                                class="absolute h-full w-full object-cover"/>
                                        </div>
                                    </div>
                                </figure>
                                <button type="button" class="bg-red-600 text-gray-200 h-8 w-full rounded-sm hover:opacity-75 mt-5 uppercase">
                                    Apply
                                </button>
                                <p class="text-center mt-3 text-gray-500 uppercase text-xs"><?= $job['date_ago'] ?></p>
                            </div>
                            <?php if(!empty($job['excerpts'])){?>
                                <div class="col-span-12 leading-5 text-sm truncate-2y lg:mt-0 -mt-2">
                                    <?= implode(', ', $job['excerpts']) ?>
                                </div>
                            <?php }?>
                        </a>
                    <?php } ?>
            </section>

        </div>
    </div>
</main>
<?php
include 'dir/footer.php';
?>