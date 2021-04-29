<?php
include 'dir/header.php';
?>
<main class="">

    <div class="relative">
        <div class="absolute z-10 left-0 right-0 top-0 bottom-0 bg-black-30 flex items-center">
            <!-- max-width: 1280px; -->
            <section class=" w-full max-w-screen-xl mx-auto ">
                <h1 class="flex items-center uppercase lg:text-5xl text-2xl mx-4">
<!--                    <span class="text-white font-semibold font-serif w-full" style="text-shadow: 1px 1px 3px #000;">Free japanese courses</span>-->
                </h1>
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
    <div class="w-full max-w-screen-xl mx-auto flex lg:px-4 px-4">
        <div class="lg:block hidden mt-6 w-64 ">
            <h3 class="flex items-center text-lg uppercase ">
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
                    <?php if(!empty($item['lists'])){ foreach ($item['lists'] as $item1) {?>
                        <a href="#" class="block py-1 px-2 ml-3 leading-5 text-gray-600 <?= !$key ? 'bg-indigo-700 text-white' : 'hover:underline hover:text-indigo-700' ?>">
                            &bull; <?= $item1 ?>
                        </a>
                    <?php }}?>
                </li>
                <?php }
                ?>
            </ul>
            <!-- image-pb-9x16 -->
            <figure class="flex mt-4">
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
                <!-- grid -->
                <div class="grid grid-cols-12 gap-4">
                    <div class="lg:col-span-8 col-span-12 lg:mt-6 mt-4 ">

                        <!-- button-bg-blue-text-icon -->
                        <a href="japanese_register.php"
                           class="bg-white border border-indigo-700 text-indigo-700 h-10 w-full rounded-sm hover:opacity-75 lg:hidden flex items-center justify-center block mb-3"
                        >
                            <i class="material-icons">open_in_new</i>
                            <span class="ml-4 uppercase">register now</span>
                        </a>

                        <h3 class="text-2xl font-semibold">FREE JAPANESE COURSES
                        </h3>
<!--                        <h3 class="text-2xl font-semibold">What you will experience</h3>-->
                        <?php foreach($japanese[0]['descriptions'] as $key => $val){?>
                            <p class="mt-3 <?= !$key ? 'text-gray-600' : '' ?>"><?= is_array($val) ? implode('<br/> - ', $val) : $val ?></p>
                            <?php if($key && isset($japanese[0]['images'][$key-1])){?>
                                <!-- image-pb-4x3 -->
                                <a href="<?= $japanese[0]['images'][$key-1] ?>" class="mt-3 block p-2 border border-transparent hover:border-indigo-700">
                                    <div class="w-full">
                                        <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                            <img
                                                alt=""
                                                src="<?= $japanese[0]['images'][$key-1] ?>"
                                                class="absolute h-full w-full object-cover"/>
                                        </div>
                                    </div>
                                    <figcaption class="text-center mt-3">Free japanese courses</figcaption>
                                </a>
                            <?php }?>
                        <?php }?>

                        <!-- button-bg-blue-text-icon -->
                        <a
                            href="japanese_syllabus.php"
                            class="bg-indigo-700 text-white h-10 w-full rounded hover:opacity-75 flex items-center justify-center mt-3"
                        >
                            <i class="material-icons">book</i>
                            <span class="ml-2 uppercase font-semibold">Syllabus</span>
                        </a>
                        <hr class="mt-5 ">
                        <h3 class="text-2xl font-semibold mt-3">Meet your instructors</h3>

                        <!-- grid -->
                        <div class="grid grid-cols-12 ">
                            <?php foreach ($support_members as $key => $support_member) {
                            if($key > 4) continue;
                            ?>
                            <div class="col-span-6">
                                <a class="mt-3 block p-2 border border-transparent hover:border-indigo-700 " href="profile.php">
                                    <!-- image-pb-1x1 -->
                                    <figure class="flex items-center">
                                        <div class="">
                                            <div class="w-12">
                                                <div class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                                    <img
                                                        alt=""
                                                        src="/fe-amazon/assets/images/businessmans/<?= rand(1, 10) ?>.jpg"
                                                        class="absolute h-full w-full object-cover"/>
                                                </div>
                                            </div>
                                        </div>
                                        <figcaption class="ml-3 truncate">
                                            <p class=""><?= $support_member['name'] ?></p>
                                            <div class="truncate text-gray-500">
                                                Associate Professor at PPE
                                            </div>
                                        </figcaption>
                                    </figure>
                                </a>
                            </div>
                            <?php } ?>
                        </div>
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
                            <li class="flex items-center mt-6">
                                <!-- button-bg-blue-text-icon -->
                                <a href="japanese_register.php"
                                   class="bg-white border border-indigo-700 text-indigo-700 h-10 w-full rounded-sm hover:opacity-75 flex items-center justify-center block"
                                >
                                    <i class="material-icons">open_in_new</i>
                                    <span class="ml-4 uppercase">register now</span>
                                </a>
                            </li>
                            <li class="mt-4 pt-4 border-t">
                                <h4 class="font-semibold text-gray-600">Introduce the course to friends:</h4>
                                <div class="pt-2 flex items-center text-indigo-700">
                                    <a class="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full" href="#" >
                                        <svg class="inline fill-current text-brand-ondark w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                    </a>
                                    <a class="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full ml-4" href="#" >
                                        <svg class="inline fill-current text-brand-ondark w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                    </a>
                                    <a class="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full ml-4" href="#" >
                                        <svg class="inline fill-current text-brand-ondark w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto mt-8 ">
                <h3 class="flex items-center text-2xl uppercase lg:mx-0 ">
                    <span class="pl-2 pb-1 border-b font-semibold w-full">Main courses</span>
                </h3>
            </section>
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <!-- grid -->
                <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 ">
                    <?php
                    foreach ($japanese as $key => $item) if($key){?>
                        <div class="lg:col-span-4 col-span-12">
                            <a href="#" class="block p-2  hover:border-blue-500 border border-transparent">
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