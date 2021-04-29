<?php
include 'dir/header.php';
?>
<main class="">
    <!-- max-width: 1280px; -->
    <div class="w-full max-w-screen-lg mx-auto px-4 ">
        <!-- grid -->
        <div class="grid grid-cols-12 mt-6 lg:gap-4 gap-2 lg:mx-0 ">
            <div class="col-span-8">
                <section class="">
                    <h3 class="text-2xl font-semibold"><?= $about_us[0]['title'] ?></h3>
                    <?php foreach($about_us[0]['descriptions'] as $key => $val){?>
                        <p class="mt-3 <?= !$key ? 'text-gray-600' : '' ?>"><?= $val ?></p>
                        <?php if($key && isset($about_us[0]['images'][$key-1])){?>
                            <!-- image-pb-4x3 -->
                            <a href="<?= $about_us[0]['images'][$key-1] ?>" class="mt-3 block p-2 border border-transparent hover:border-indigo-700">
                                <div class="w-full">
                                    <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                        <img
                                                alt=""
                                                src="<?= $about_us[0]['images'][$key-1] ?>"
                                                class="absolute h-full w-full object-cover"/>
                                    </div>
                                </div>
                                <figcaption class="text-center mt-3">Partners of PPE & others</figcaption>
                            </a>
                        <?php }?>
                    <?php }?>
                </section>
                <section class="">
                    <hr class="mt-5 ">
                    <h3 class="text-xl font-medium mt-3 relative">
                        10 Comments
<!--                        <b class="bg-gray-200 text-gray-700 text-sm font-medium px-1 py-px rounded-full inline-block absolute absolute-y ml-2">10</b>-->
                    </h3>

                    <!-- flex-items-center-justify-between -->
                    <form class="flex mt-4">
                        <!-- image-pb-1x1 -->
                        <figure class="">
                            <div class="w-12">
                                <div class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                    <img
                                            alt=""
                                            src="https://i.pravatar.cc/300"
                                            class="absolute h-full w-full object-cover"/>
                                </div>
                            </div>
                        </figure>
                        <div class=" w-full ml-3">

                            <!-- input-border-b-2-alpinejs -->
                            <label class="block relative" x-data="{focus: false, value:''}">
  <span
          :class="{'-translate-y-5 text-indigo-700 text-sm': focus||value.length}"
          class="block absolute top-0 mt-4 bg-white duration-200 ease-in-out transform"
  >Add a public comment</span
  >
                                <span
                                        :class="{'w-full' : focus}"
                                        class="absolute left-0 right-0 bottom-0 border-b-2 border-indigo-700 w-0 duration-200 ease-in-out transform"
                                >
  </span>
                                <input
                                        x-model="value"
                                        :class="{'border-blue-500': focus||value.length}"
                                        x-on:focus="focus=true"
                                        x-on:focusout="focus=false"
                                        type="text"
                                        class="border-b-2 border-gray-400 h-10 w-full mt-2 outline-none"
                                        placeholder="Add a public comment..."
                                />
                            </label>
                            <div class="mt-3 flex justify-end">
                                <!-- button-bg-white -->
                                <button
                                        type="button"
                                        class="bg-white text-gray-800 h-10 w-32 rounded hover:opacity-75 hover:bg-gray-200 border border-gray-400"
                                >
                                    <span class="uppercase">cancel</span>
                                </button>
                                <!-- button-bg-blue -->
                                <button
                                        type="button"
                                        class="bg-indigo-700 text-white h-10 w-32 rounded hover:opacity-75 ml-3"
                                >
                                    <span class="uppercase">comment</span>
                                </button>

                            </div>
                        </div>
                    </form>

                    <ul class="">
                        <?php for($i=1; $i<=10; $i++){?>

                        <li class="flex mt-4 ">
                            <!-- image-pb-1x1 -->
                            <figure class="">
                                <div class="w-12">
                                    <div class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                        <img
                                                alt=""
                                                src="https://i.pravatar.cc/300"
                                                class="absolute h-full w-full object-cover"/>
                                    </div>
                                </div>
                            </figure>
                            <div class="ml-3">
                                <a href="#" class="text-indigo-700 hover:underline">Nga Ngo</a>
                                <span class="text-gray-600">10 months ago</span>
                                <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque excepturi iure perspiciatis, provident qui saepe sed totam ut vero! Ab beatae consectetur, dolore exercitationem inventore nihil numquam voluptates. Odit!</p>
                            </div>
                        </li>
                        <?php }?>
                    </ul>
                </section>
            </div>
            <div class="lg:col-span-4 col-span-12 ">
                <h3 class="text-2xl font-semibold mb-3">Another posts</h3>
                <?php
                foreach ($about_us as $post) { ?>
                    <div class="">
                        <a href="about_us.php" class="flex py-2 px-2 hover:border-blue-500 border border-transparent overflow-hidden">
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
            </div>
        </div>
    </div>
</main>
<?php
include 'dir/footer.php';
?>