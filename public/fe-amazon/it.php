<?php
include 'dir/header.php';
?>
<main class="">
    <!-- max-width: 1280px; -->
    <!-- grid -->
    <div class="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
        <div class="lg:col-span-3 col-span-12">
            <div class="sticky top-0 pt-4">
                <!-- image-pb-1x1 -->
                <a href="#" class="flex items-center p-1 border-transparent border hover:border-yellow-600">
                    <div class="w-10">
                        <div class="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                            <img
                                    alt=""
                                    src="/fe-amazon/assets/images/its/7.jpg"
                                    class="absolute h-full w-full object-cover"/>
                        </div>
                    </div>
                    <figcaption class="ml-3 leading-5 w-48">
                        <h4 class="">メニュー作り</h4>
                        <p class="truncate text-sm text-gray-500">
                            Menue maker 冷蔵庫にある材料で、作る人や家族に対して、口に合う味、栄養分に合う気持ち、などのお勧めい料理のアプリ。
                        </p>
                    </figcaption>
                </a>
                <ul class="mt-3 lg:block hidden">
                    <?php
                    foreach ($it_tabs as $key => $item) {?>
                        <li class="mt-1">
                            <!-- button-bg-white-text-icon -->
                            <button
                                    type="button"
                                    class="<?= !$key ? 'bg-gray-200' : 'bg-transparent' ?> text-gray-800 h-10 w-full rounded hover:opacity-75 hover:bg-gray-200 border border-transparent flex items-center px-2"
                            >
                                <i class="material-icons"><?= $item['icon'] ?></i>
                                <span class="ml-3"><?= $item['title'] ?></span>
                            </button>
                        </li>
                    <?php }?>
                </ul>
            </div>
        </div>
        <div class="lg:col-span-9 col-span-12">
            <!-- max-width: 1280px; -->
            <div class="grid grid-cols-12 gap-4">
                <div class="lg:col-span-8 col-span-12 mt-4">
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
                                class="bg-indigo-700 text-white h-10 lg:w-32 w-10 rounded-full -ml-3 z-10 border-2 border-gray-300 hover:bg-indigo-600 "
                        >
                            <span class="">+<?= rand(10, 100) ?></span>
                            <span class="lg:inline hidden"> members</span>
                        </button>
                    </section>
                    <section class="">
                        <h3 class="text-2xl font-semibold mt-3">Description</h3>
                        <?php
                        foreach($its[0]['descriptions'] as $key => $val){?>
                            <p class="mt-3 <?= $key<2 ? 'text-gray-600' : '' ?>"><?= $val ?></p>
                            <?php if($key && isset($its[0]['images'][$key-1])){?>
                                <!-- image-pb-4x3 -->
                                <a href="<?= $its[0]['images'][$key-1] ?>" class="mt-3 block p-2 border border-transparent hover:border-indigo-700">
                                    <div class="w-full">
                                        <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                            <img
                                                    alt=""
                                                    src="<?= $its[0]['images'][$key-1] ?>"
                                                    class="absolute h-full w-full object-cover"/>
                                        </div>
                                    </div>
                                    <figcaption class="text-center mt-3">Food's not rubbish</figcaption>
                                </a>
                            <?php }?>
                        <?php }?>
                    </section>

                    <section class="overflow-auto">
                        <h3 class="text-2xl font-semibold mt-3">Tasks</h3>
                        <!-- table-auto -->
                        <table class="table-auto w-full mt-3 border ">
                            <tbody>
                            <?php for($i=1; $i<=10; $i++){?>
                                <tr>
                                    <td class="border-b px-4 py-2 ">
                                        <div class="truncate flex items-center ">
                                        <!-- button-bg-blue-icon -->
                                        <button
                                                type="button"
                                                class="bg-blue-500 text-white rounded-sm h-4 w-4 hover:opacity-75 flex items-center justify-center"
                                        >
                                            <i class="material-icons text-xs">home</i>
                                        </button>
                                        <p class="w-64 truncate ml-2">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex incidunt inventore itaque molestiae nihil nobis optio porro quod, tempora tenetur. A ad atque beatae culpa, delectus exercitationem explicabo nostrum perspiciatis.
                                        </p>
                                        </div>
                                    </td>
                                    <td class="border-b px-4 py-2">
                                        <?php
                                        $rand = rand(1, 3);
                                        ?>
                                        <?php if ($rand == 1) { ?>
                                            <span
                                                class="bg-blue-100 text-indigo-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">testing</span>
                                        <?php } ?>
                                        <?php if ($rand == 2) { ?>
                                            <span class="bg-yellow-100 text-yellow-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">done</span>
                                        <?php } ?>
                                        <?php if ($rand == 3) { ?>
                                            <span class="bg-gray-100 text-gray-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">to do</span>
                                        <?php } ?>
                                    </td>
                                    <td class="border-b px-4 py-2">
                                        <!-- image-pb-1x1 -->
                                        <figure class="">
                                            <div class="w-6">
                                                <div class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                                    <img
                                                        alt=""
                                                        src="/fe-amazon/assets/images/teens/<?= rand(1, 10) ?>.jpg"
                                                        class="absolute h-full w-full object-cover"/>
                                                </div>
                                            </div>
                                        </figure>
                                    </td>
                                </tr>
                            <?php }?>
                            </tbody>
                        </table>
                    </section>

                    <section class="">
                        <h3 class="text-2xl font-semibold mt-3">Releases</h3>
                        <ul class="relative">
                            <li class="absolute top-0 bottom-0 left-0 ml-6 mb-3 w-px bg-blue-500"></li>
                            <li class="bg-white shadow-md border rounded-lg p-3 relative mt-10">
                                <!-- button-bg-white-icon -->
                                <button
                                    type="button"
                                    class="bg-blue-500 text-white h-8 w-8 rounded-full border border-white flex items-center justify-center absolute top-0 -mt-4"
                                >
                                    <i class="material-icons">check</i>
                                </button>
                                <div class="lg:ml-12 ml-0 mt-2 lg:flex lg:justify-between ">
                                    <article class="">
                                        <h3 class="text-xl">Phase 1: App Planning & Discovery (4 Weeks)</h3>
                                        <div class="leading-6 text-gray-700 ">
                                            <p class="mt-2">Strategizing Your App Experience</p>
                                            <p class="mt-2">Crafting The User Experience</p>
                                            <p class="mt-2">Creating A Solid Product Roadmap</p>
                                        </div>
                                    </article>
                                    <time class="text-gray-500 block mt-2">10/11/2018</time>
                                </div>
                            </li>
                            <li class="bg-white shadow-md border rounded-lg p-3 relative mt-10">
                                <!-- button-bg-white-icon -->
                                <button
                                    type="button"
                                    class="bg-blue-500 text-white h-8 w-8 rounded-full border border-white flex items-center justify-center absolute top-0 -mt-4"
                                >
                                    <i class="material-icons">check</i>
                                </button>
                                <div class="lg:ml-12 ml-0 mt-2 lg:flex lg:justify-between ">
                                    <article class="">
                                        <h3 class="text-xl">Phase 2: Web App Development (2+ Months)</h3>
                                        <div class="leading-6 text-gray-700 ">
                                            <p class="mt-2">Once the research, designs and roadmap are out of the way, it’s time for the build. The development phase takes place primarily on our end with very little work for clients—the developers and programmers use this time to write code and create a great app experience.</p>
                                            <p class="mt-2">The length of the development phase depends on the app’s complexity per the roadmap from phase one. If your app is mostly for information purposes and only offers a few interactions, it might be built in less than a month. A more complicated app with an inventory, geo-location, social logins, dynamic content and a user database could take double or even triple the effort—and therefore time.</p>
                                            <p class="mt-2">Prior to going live in the app store, we give teams a chance to demo and test the app. We’ll conduct quality assurance testing, squash bugs and make any final design adjustments that make sense for the app’s audience.</p>
                                        </div>
                                    </article>
                                    <time class="text-gray-500 block mt-2">10/12/2018</time>
                                </div>
                            </li>
                            <li class="bg-white shadow-md border rounded-lg p-3 relative mt-10">
                                <!-- button-bg-white-icon -->
                                <button
                                    type="button"
                                    class="bg-blue-500 text-white h-8 w-8 rounded-full border border-white flex items-center justify-center absolute top-0 -mt-4"
                                >
                                    <i class="material-icons">check</i>
                                </button>
                                <div class="lg:ml-12 ml-0 mt-2 lg:flex lg:justify-between ">
                                    <article class="">
                                        <h3 class="text-xl">Phase 3: Maintenance, Support & Updates (Ongoing)</h3>
                                        <div class="leading-6 text-gray-700 mt-2">
                                            <p class="mt-2">Once the app has been developed, approved by the app store and downloaded by real people, it’s time to pop a bottle of champagne, sure—but it’s also time to keep things moving in the right direction. This is when you determine which features to build next and implement ongoing testing to keep the app working correctly.
                                            </p>
                                            <p class="mt-2">To help plan for this part, the roadmap we deliver in phase one outlines specific features and updates that can be developed in the months following the launch.
                                            </p>
                                        </div>
                                    </article>
                                    <time class="text-gray-500 block mt-2 whitespace-no-wrap">10/02/2019</time>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section class="">
                        <h3 class="text-2xl font-semibold mt-3">Members</h3>

                        <!-- grid -->
                        <div class="grid grid-cols-12 gap-0 mt-3 ">
                            <?php foreach ($core_members as $item) {?>
                                <div class="lg:col-span-2 col-span-3">
                                    <!-- image-pb-1x1 -->
                                    <a href="#" class="block lg:p-2 p-1 border border-transparent hover:border-indigo-700 w-full">
                                        <div class="w-full">
                                            <div class="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                                <img
                                                    alt=""
                                                    src="/fe-amazon/assets/images/businessmans/<?= rand(1, 10) ?>.jpg"
                                                    class="absolute h-full w-full object-cover"/>
                                            </div>
                                        </div>
                                        <figcaption class="mt-2 truncate-2y leading-5 h-10"><?= $item['name'] ?></figcaption>
                                    </a>
                                </div>
                            <?php }?>
                            <?php foreach ($support_members as $item) {?>
                                <div class="lg:col-span-2 col-span-3">
                                    <!-- image-pb-1x1 -->
                                    <a href="#" class="block lg:p-2 p-1 border border-transparent hover:border-indigo-700">
                                        <div class="w-full">
                                            <div class="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                                <img
                                                    alt=""
                                                    src="/fe-amazon/assets/images/businessmans/<?= rand(1, 10) ?>.jpg"
                                                    class="absolute h-full w-full object-cover"/>
                                            </div>
                                        </div>
                                        <figcaption class="mt-2 truncate-2y leading-5 h-10"><?= $item['name'] ?></figcaption>
                                    </a>
                                </div>
                            <?php }?>
                        </div>
                    </section>

                </div>
                <div class="lg:col-span-4 col-span-12 ">
                    <h3 class="text-2xl font-semibold pt-3 border-t lg:hidden block">Overview</h3>
                    <ul class="sticky top-0 pt-4">
                        <li class="flex items-center">
                            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                <i class="material-icons text-3xl text-indigo-700">widgets</i>
                            </div>
                            <div class="ml-3">
                                <div class="text-xl">Version</div>
                                <div class="text-gray-600">1.1.2</div>
                            </div>
                        </li>
                        <li class="flex items-center mt-5">
                            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                <i class="material-icons text-3xl text-indigo-700">system_update</i>
                            </div>
                            <div class="ml-3">
                                <div class="text-xl">300,000 installs</div>
                                <div class="text-gray-600">10+ countries</div>
                            </div>
                        </li>
                        <li class="flex items-center mt-5">
                            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                <i class="material-icons text-3xl text-indigo-700">event_note</i>
                            </div>
                            <div class="ml-3">
                                <div class="text-xl">Next release</div>
                                <div class="text-gray-600">20/12/2020</div>
                            </div>
                        </li>
                        <li class="flex items-center mt-5">
                            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                                <i class="material-icons text-3xl text-indigo-700">payments</i>
                            </div>
                            <div class="ml-3">
                                <div class="text-xl">
                                    Revenue
                                </div>
                                <div class="text-gray-600">$100,000</div>
                            </div>
                        </li>
                        <li class="flex items-center mt-6">
                            <!-- button-bg-blue-text-icon -->
                            <a href="it_join.php"
                               class="bg-yellow-500 text-black h-10 w-full rounded-sm hover:opacity-75 flex items-center justify-center"
                            >
                                <i class="material-icons">open_in_new</i>
                                <span class="ml-4 uppercase">join with us</span>
                            </a>
                        </li>
                        <li class="mt-4 pt-4 border-t">
                            <h4 class="font-semibold text-gray-600">Platforms:</h4>
                            <div class="pt-2 flex items-center text-indigo-700">
                                <a class="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full" href="#" >
                                    <svg class="inline fill-current text-brand-ondark w-6 h-6" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z"/></svg>
                                </a>
                                <a class="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full ml-4" href="#" >
                                    <svg class="inline fill-current text-brand-ondark w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"/></svg>
                                </a>
                                <a class="h-10 px-4 flex items-center justify-center bg-gray-200 rounded-full ml-4" href="#" >
                                    <svg class="inline fill-current text-brand-ondark w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>
                                    <span class="ml-2">www.ppe.com</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto mt-8 ">
                <h3 class="flex items-center text-2xl uppercase lg:mx-0 ">
                    <span class="pl-2 pb-1 font-light w-full">Another projects</span>
                </h3>
            </section>

            <!-- max-width: 1280px; -->
            <section class="w-full max-w-screen-xl mx-auto ">
                <!-- grid -->
                <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
                    <?php foreach ($its as $key => $it) if($key){?>
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

        </div>
    </div>
</main>
<?php
include 'dir/footer.php';
?>