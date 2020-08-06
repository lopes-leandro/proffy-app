import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/44936493?s=460&u=24fe0cf0ce37d936a8981cca6a948b748aa3796f&v=4" alt="Leandro Lopes" />
                <div>
                    <strong>Leandro Lopes</strong>
                    <span>Desenvolvedor Front-End ReactJS e Angular, Desenvolvedor Apex Salesforce</span>
                </div>
            </header>
            <p>Mussum Ipsum, cacilds vidis litro abertis.
            Si num tem leite então bota uma pinga aí cumpadi!
            Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
            Mauris nec dolor in eros commodo tempor.
            Aenean aliquam molestie leo, vitae iaculis nisl.
            Paisis, filhis, espiritis santis.
                    </p>
            <footer>
                <p>Preço por hora: <strong>R$50,00</strong></p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp icon" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    );
}

export default TeacherItem;