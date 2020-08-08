import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TextArea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import './styles.css';
import api from "../../services/api";

function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([{
        week_day: '',
        from: '',
        to: ''
    }]);

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        })

        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch((err) => {
            alert('Erro inesperado no cadastro.')
        });

    }

    function addScheduleItem() {

        setScheduleItems([
            ...scheduleItems,
            {
                week_day: '',
                from: '',
                to: ''
            }
        ]);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição." />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }} />
                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Inglês', label: 'Inglês' },
                                { value: 'Chines', label: 'Chines' },
                                { value: 'Koreano', label: 'Koreano' },
                                { value: 'Russo', label: 'Russo' }
                            ]} />
                        <Input
                            name="cost"
                            label="Custo da sua aula por hora"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addScheduleItem}>+ Novo horário</button>
                        </legend>
                        {scheduleItems.map((schedule, index) => {
                            return (
                                <div key={schedule.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={schedule.week_day}
                                        onChange={(e) => { setScheduleItemValue(index, 'week_day', e.target.value) }}
                                        options={[
                                            { value: '1', label: 'Domingo' },
                                            { value: '2', label: 'Segunda-feira' },
                                            { value: '3', label: 'Terça-feira' },
                                            { value: '4', label: 'Quarta-feira' },
                                            { value: '5', label: 'Quinta-feira' },
                                            { value: '6', label: 'Sexta-feira' },
                                            { value: '7', label: 'Sábado' }
                                        ]} />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={schedule.from}
                                        onChange={(e) => { setScheduleItemValue(index, 'from', e.target.value) }}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={schedule.to}
                                        onChange={(e) => { setScheduleItemValue(index, 'to', e.target.value) }}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante!<br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;