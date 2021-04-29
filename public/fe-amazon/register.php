<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <link rel="stylesheet" href="assets/css/tailwind-output.css"/>
</head>
<body class="">
    <!-- max-width: 672px; -->
    <header class="w-full max-w-md mx-auto px-4 mt-4">
        <a href="index.php" class="hover:border-indigo-700 border border-transparent px-2 py-1 leading-6 block">
            <h3 class="text-3xl font-semibold"><span class="text-blue-600">P</span><span class="text-red-600">P</span><span
                        class="text-purple-600">E</span></h3>
            <h4 class="whitespace-no-wrap -mb-1 font-thin text-gray-200">
                <span class="text-blue-600">Paracel</span> <span class="text-red-600">Project</span> <span
                        class="text-purple-600">Education</span>
            </h4>
        </a>
    </header>

    <!-- max-width: 672px; -->
    <main class="w-full max-w-md mx-auto px-4">
        <form action="" class="p-3 border border-gray-400 rounded mt-3">
            <h3 class="text-2xl ">Create account</h3>
            <!-- input-border -->
            <label class="block mt-3">
                <span class="block text-gray-700">Your name</span>
                <input
                        type="text"
                        class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                        placeholder="Type here..."
                />
            </label>
            <!-- input-border -->
            <label class="block mt-3">
                <span class="block text-gray-700">E-mail</span>
                <input
                        type="text"
                        class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                        placeholder="Type here..."
                />
            </label>
            <!-- input-border -->
            <label class="block mt-3">
                <span class="block text-gray-700">Password</span>
                <input
                        type="password"
                        class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                        placeholder="Type here..."
                />
            </label>
            <!-- input-border -->
            <label class="block mt-3">
                <span class="block text-gray-700">Re-enter password</span>
                <input
                        type="password"
                        class="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                        placeholder="Type here..."
                />
            </label>
            <div class="text-center mt-3">
                <!-- button-bg-blue -->
                <button
                        type="button"
                        class="bg-indigo-700 text-white h-10 w-full rounded hover:opacity-75 "
                >
                    <span class="">Create account</span>
                </button>
            </div>
        </form>

        <!-- divider -->
        <div class="border-t border-gray-400 relative mt-6">
            <span class="absolute absolute-y absolute-x top-0 -mt-3 bg-white px-3 text-sm text-gray-800">Already have an account?</span>
        </div>
        <div class="text-center mt-6 clear-both">
            <!-- button-bg-blue -->
            <a
                href="login.php"
                class="bg-gray-100 text-gray-800 h-10 w-32 rounded hover:opacity-75 border flex items-center justify-center mx-auto"
            >
                <span class="">Sign In</span>
            </a>
        </div>
    </main>
</body>
</html>