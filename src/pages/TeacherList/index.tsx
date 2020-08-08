import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";

import TeacherItem, { Teacher } from "../../components/TeacherItem";

import Input from "../../components/Input";

import Select from "../../components/Select";

import './styles.css';
import api from "../../services/api";


function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        // async/await <==> then/catch
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form onSubmit={searchTeachers} id="search-teachers">
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
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
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => setWeekDay(e.target.value)}
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
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>;
                })}
            </main>
        </div>
    )
}

export default TeacherList;