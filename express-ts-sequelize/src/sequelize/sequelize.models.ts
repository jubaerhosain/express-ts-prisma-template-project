import { Model, Column, Table } from "sequelize-typescript";

@Table
export class Post extends Model<Post> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        allowNull: false,
    })
    title: string;

    @Column({
        type: "TEXT",
        allowNull: true,
    })
    content: string | null;

    @Column({
        allowNull: false,
        defaultValue: false,
    })
    published: boolean;
}
