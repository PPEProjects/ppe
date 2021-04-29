<?php
include 'dir/header.php';
?>
<main class="">
    <!-- max-width: 1280px; -->
    <section class="w-full max-w-screen-xl mx-auto lg:px-4">
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
        <div class="main-carousel" data-flickity='{ "autoPlay": true }'>
            <?php for($i=1; $i<=11; $i++){?>
                <!-- image 4x1 -->
                <figure class="flex items-center carousel-cell w-full">
                    <div class="w-full">
                        <div class="pb-3x1 relative overflow-hidden bg-gray-300">
                            <img
                                    alt=""
                                    src="/fe-amazon/assets/images/wide-sliders/<?= $i ?>.jpg"
                                    class="absolute h-full w-full object-cover">
                        </div>
                    </div>
                </figure>
            <?php }?>
        </div>
    </section>
    <div class="w-full max-w-screen-xl mx-auto flex mt-8 lg:px-4 ">
        <div class="lg:block hidden w-64">
            <!-- image-pb-9x16 -->
            <figure class="flex ">
                <div class="w-full">
                    <div style="padding-bottom: 200%;" class="pb-9x16 relative rounded-sm overflow-hidden bg-gray-200">
                        <img alt="" src="/fe-amazon/assets/images/oylien-school.gif" class="absolute h-full w-full object-cover"/>
                    </div>
                </div>
            </figure>
            <!-- image-pb-9x16 -->
            <figure class="flex mt-8">
                <div class="w-full">
                    <div style="padding-bottom: 200%;" class="pb-9x16 relative rounded-sm overflow-hidden bg-gray-300">
                        <img alt="" src="/fe-amazon/assets/images/discount.gif" class="absolute h-full w-full object-cover"/>
                    </div>
                </div>
            </figure>
        </div>
        <div class="lg:pl-5 ">
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <h3 class="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                    <i class="material-icons text-6xl text-gray-400">public</i>
                    <span class="pl-2 pb-1 border-b font-light w-full">Japanese</span>
                </h3>
            </section>
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <!-- grid -->
                <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
                    <?php
                    foreach ($japanese as $item) {?>
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
                                <a
                                        href="japanese_syllabus.php"
                                        class="text-indigo-700 bg-white h-10 w-full rounded-sm hover:opacity-75 flex items-center justify-center border border-indigo-700 mt-3"
                                >
                                    <i class="material-icons">book</i>
                                    <span class="ml-2 uppercase font-semibold">Syllabus</span>
                                </a>
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

            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto mt-8">
                <h3 class="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                    <i class="material-icons text-6xl text-gray-400">devices</i>
                    <span class="pl-2 pb-1 border-b font-light w-full">it</span>
                </h3>
            </section>
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <!-- grid -->
                <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
                    <?php foreach ($its as $it) {?>
                        <a href="/fe-amazon/it.php" class="lg:col-span-4 col-span-12 bg-white rounded-sm overflow-hidden border border-gray-200 shadow-lg pb-4 hover:border-orange-300 hover:shadow-xl">
                            <!-- flex-items-center-justify-between -->
                            <section class="flex items-center bg-gray-100 px-3 py-2">
                                <?php for($i=1; $i<=4; $i++){?>
                                <!-- image-pb-1x1 -->
                                    <figure class="-ml-2">
                                        <div class="w-10 border-white border-2 rounded-full overflow-hidden">
                                            <div class="pb-1x1 relative  bg-gray-300 border-white border-2 rounded-full overflow-hidden">
                                                <img alt="" src="/fe-amazon/assets/images/teens/<?= $i ?>.jpg"
                                                     class="absolute h-full w-full object-cover">
                                            </div>
                                        </div>
                                    </figure>
                                <?php }?>
                                <!-- button-bg-blue -->
                                <button
                                        type="button"
                                        class="bg-white text-yellow-600 h-10 lg:w-32 w-10 rounded-full -ml-3 z-10 border-2 border-yellow-300"
                                >
                                    <span class="">+<?= rand(10, 100) ?></span>
                                    <span class="lg:inline hidden"> members</span>
                                </button>
                            </section>
                            <section class="mt-6 mx-4">
                                <span class="text-xs font-semibold text-gray-500 uppercase">project</span>
                                <h4 class="font-semibold text-2xl leading-7 mt-1"><?= $it['title'] ?></h4>
                                <!-- div-icon-text -->
                                <div class="flex items-center text-sm mt-2">
                                    <i class="material-icons text-gray-500">today</i>
                                    <span class="ml-1 text-gray-500">Dua in</span>
                                    <b class="ml-1 "><?= rand(30, 1000) ?> days</b>
                                </div>
                                <p class="mt-2 text-gray-500 truncate-2y"><?= implode(',', $it['descriptions']) ?></p>
                            </section>
                            <section class="mt-6 mx-4">
                                <b class=""><?= rand(10, 1000) ?> task</b>
                                <?php
                                $completed_percent = rand(10, 99);
                                ?>
                                <span class="text-gray-500 text-sm">(<?= $completed_percent ?>% completed)</span>
                                <div class="relative rounded-full overflow-hidden bg-gray-200 h-2 mt-1">
                                    <div class="absolute left-0 top-0 bottom-0 bg-yellow-600" style="width: <?= $completed_percent?>%;"></div>
                                </div>
                                <button type="button" class="bg-yellow-500 text-black h-10 w-full rounded-sm hover:opacity-75 mt-5 ">
                                    <span class="">Join</span>
                                </button>
                            </section>
                        </a>
                    <?php } ?>
                </div>
            </section>

            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto mt-8">
                <h3 class="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                    <i class="material-icons text-6xl text-gray-400">work_outline</i>
                    <span class="pl-2 pb-1 border-b font-light w-full">jobs</span>
                </h3>
            </section>
            <!-- max-width: 1280px; -->
            <div class="w-full max-w-screen-xl mx-auto">
                <!-- grid -->
                <div class="grid grid-cols-12 lg:gap-4 gap-2">
                    <div class="lg:col-span-9 col-span-12 lg:mx-0 mx-2">
                        <?php foreach ($jobs as $job) { ?>
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
                        <button type="button" class="mt-5 bg-white text-red-600 h-10 px-3 rounded-sm hover:bg-red-600 hover:text-white border border-red-600 flex items-center justify-center">
                            <i class="material-icons">arrow_downward</i>
                            <span class="ml-2 uppercase font-light">load more</span>
                        </button>
                    </div>
                    <div class="lg:col-span-3 col-span-12 lg:mx-0 mx-2 relative ">
                        <section class="sticky top-0 pt-4">
                            <div class="border p-2 rounded-sm">
                                <h4 class="text-sm uppercase font-semibold text-gray-500">Find job supporters </h4>
                                    <?php foreach ($support_members as $key => $support_member) {
                                        if($key > 2) continue;
                                    ?>
                                    <a class="mt-3 block hover:opacity-75" href="profile.php">
                                        <!-- image-pb-1x1 -->
                                        <figure class="flex items-center">
                                            <div class="w-12">
                                                <div class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                                    <img
                                                        alt=""
                                                        src="/fe-amazon/assets/images/businessmans/<?= rand(1, 10) ?>.jpg"
                                                        class="absolute h-full w-full object-cover"/>
                                                </div>
                                            </div>
                                            <figcaption class="ml-3">
                                                <p class=""><?= $support_member['name'] ?></p>
                                                <button class="px-2 bg-gray-200 flex items-center text-sm rounded-sm mt-1">
                                                    <i class="material-icons text-lg">call</i>
                                                    <span class="ml-1"><?= $support_member['phone_number'] ?></span>
                                                </button>
                                            </figcaption>
                                        </figure>
                                    </a>
                                    <?php } ?>
                                <h4 class="text-sm uppercase font-semibold text-gray-500 mt-5">leave your phone number</h4>
                                <p class="leading-5 mt-1 text-sm">If you so shy to make a call. Let's leave your phone number we will call you later.</p>

                                <!-- input-border -->
                                <label class="block">
                                    <input
                                        type="text"
                                        class="border border-gray-400 h-8 w-full px-3 mt-2 rounded-sm"
                                        placeholder="0xxx99999"
                                    />
                                </label>
                                <!-- button-bg-blue -->
                                <button
                                    type="button"
                                    class="bg-red-600 text-white h-8 w-full rounded-sm hover:opacity-75 mt-2"
                                >
                                    <span class="uppercase text-sm">submit</span>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto mt-8">
                <h3 class="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                    <i class="material-icons text-6xl text-gray-400">home</i>
                    <span class="pl-2 pb-1 border-b font-light w-full">about us</span>
                </h3>
            </section>
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <!-- grid -->
                <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
                    <?php
                    foreach ($about_us as $post) { ?>
                        <div class="lg:col-span-6 col-span-12">
                            <a href="about_us.php" class="flex py-1 px-2 hover:border-blue-500 border border-transparent overflow-hidden">
                                <!-- image-pb-1x1 -->
                                <figure class="flex items-center">
                                    <div class="w-20">
                                        <div class="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                            <img alt="" src="<?= @$post['images'][0] ?>"
                                                 class="absolute h-full w-full object-cover"/>
                                        </div>
                                    </div>
                                </figure>
                                <div class="ml-3">
                                    <h3 class="truncate-2y text-lg leading-6"><?= $post['title'] ?></h3>
                                    <p class="truncate-2y font-light text-gray-800 leading-5 mt-1"><?= implode(', ', $post['descriptions']) ?></p>
                                </div>
                            </a>
                        </div>
                    <?php } ?>
                    <div class="col-span-12 pl-2">
                        <!-- button-bg-white-text-icon -->
                        <button
                                type="button"
                                class="bg-white text-gray-800 h-10 px-3 rounded-sm hover:opacity-75 hover:bg-gray-200 border border-gray-400 flex items-center justify-center"
                        >
                            <i class="material-icons">arrow_downward</i>
                            <span class="ml-2 uppercase font-light">load more</span>
                        </button>
                    </div>
                </div>
            </section>

        </div>
    </div>
</main>
<?php
include 'dir/footer.php';
?>