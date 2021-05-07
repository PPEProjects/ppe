import React, {Component, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersSelector, setUserData} from "../../slices/users";
import Ajax from "../../components/Ajax";
import {Link, useHistory} from "react-router-dom";
import Alert from "../../components/Alert";
import UsersFormTypeJapanese from "./UsersFormTypeJapanese";
import UsersFormTypeInstructor from "./UsersFormTypeInstructor";
import UsersFormTypeProjects from "./UsersFormTypeProjects";
import FormUploadFile from "../../components/FormUploadFile";
import {Button, Checkbox, Input, Select} from "../../components/Form";
import FormFooter from "../../components/FormFooter";
import {formSelector, setFormData} from "../../slices/form";

const UsersCreatePage = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(usersSelector);
    const {checkboxes} = useSelector(formSelector);
    const [show, setShow] = useState(1);
    const [types, setTypes] = useState({});

    const history = useHistory();

    useEffect(() => {
        console.log('1', 1)
        dispatch(setFormData({checkboxes: {}}))
    }, []);
    useEffect(() => {
        setTypes(checkboxes.types ?? {})
        console.log('types 2', types)
    }, [checkboxes]);

    useEffect(() => {
        let type = new URL(window.location.href).searchParams.get("type")
        let checkboxes = {"types": {}}
        if (type) {
            checkboxes[type] = `on`
        }
        dispatch(setFormData({checkboxes: checkboxes}))
        // dispatch(setFormData({checkboxes: {types: {'Japanese instructor': `on`}}}))
        console.log('types', types)
    }, []);

    const userSAVE = async (e) => {
        e.preventDefault();
        const params = new FormData(e.target);
        let res = await Ajax.post(`/users`, params);
        if (res.status === `error`) {
            Alert({t: res.status, c: res.errors});
            return;
        }

        history.goBack();
    };

    const userCHECK = async (email) => {
        let res = await Ajax.post(`/users`, {userCheckUnique: `userCheckUnique`, email: email});
        if (res.status === `error`) {
            Alert({t: res.status, c: res.errors});
            return;
        }
    };

    return (
        <form onSubmit={(e) => userSAVE(e)} className="w-full my-10">
            <main className="w-full max-w-3xl mx-auto rounded">
                <h1 className="font-bold text-lg text-gray-700">Add User Manually</h1>
                <section
                    className={`${
                        show !== 1 ? `hidden` : ``
                    } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
                >
                    <h2 className=" text-gray-800 font-semibold">
                        Essential Information
                    </h2>
                    <h2 className=" text-gray-700 text-sm">
                        Add the title, images and description that best describes this user.
                    </h2>
                    {!types[`Japanese instructor`] &&
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Full name</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input name={`name`}/>
                    </label>
                    }
                    {types[`Japanese instructor`] &&
                    <>
                        <label className="block mt-4">
                            <div className="flex -mb-3"><span
                                className="block font-medium">Full name in Vietnamese</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Input name={`infos_lang[vi][name]`}/>
                        </label>
                        <label className="block mt-4">
                            <div className="flex -mb-3"><span
                                className="block font-medium">Full name in English</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Input name={`infos_lang[en][name]`}/>
                        </label>
                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">Full name in Japanese</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Input name={`infos_lang[jp][name]`}/>
                        </label>
                    </>
                    }

                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Roles</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Checkbox
                            name={`types`}
                            values={[
                                `Admin`,
                                `Office leader`,
                                `Japanese instructor`,
                                `IT project instructor`,
                                `Job supporter`,
                                `Life supporter`,
                                `Japanese learner`,
                                `IT project member`,
                                `Job hunter`,
                            ]}
                        />

                    </label>


                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Email (login)</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input onChange={(value) => userCHECK(value)} name={`email`} type={`email`}/>
                    </label>

                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Password (login)</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input
                            name={`password`}
                            type={`password`}
                        />
                    </label>

                    <label className="block mt-4">
                        <div className="flex "><span className="block font-medium">Avatar</span><b
                            className="text-red-600 ml-1"> (*)</b></div>

                    </label>
                    <FormUploadFile/>
                </section>
                {types['Job supporter'] && (
                    <section
                        className={`${
                            show !== 2 ? `hidden` : ``
                        } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
                    >
                        <h2 className=" text-gray-800 font-semibold">Register information</h2>
                        <Input title={`Phone`} name={`infos[phone]`} type={`tel`}/>
                    </section>
                )}
                {types['Japanese instructor'] && <UsersFormTypeInstructor show={show}/>}
                {types[`Japanese learner`] && <UsersFormTypeJapanese show={show}/>}
                {types[`IT project member`] && <UsersFormTypeProjects show={show}/>}
            </main>
            <FormFooter
                tabNumber={types[`Japanese learner`] || types[`IT project member`] || types[`Japanese instructor`] ? 3 : 1}

                show={show}
                hidden={`admin_register`}
                onShowMinus={() => setShow(show - 1)}
                onShowPlus={() => setShow(show + 1)}
            />
        </form>
    );
};

export default UsersCreatePage;
