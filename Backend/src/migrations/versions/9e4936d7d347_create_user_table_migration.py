"""initial migration

Revision ID: 9e4936d7d347
Revises: 
Create Date: 2023-11-11 14:21:53.655182

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '9e4936d7d347'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('mail', sa.String(length=80), nullable=False),
    sa.Column('biometric_key', sa.Text(), nullable=False, unique=True),
    sa.Column('created_at', mysql.DATETIME(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.drop_index('username', table_name='User')
    op.drop_index('password', table_name='User')
    op.drop_index('mail', table_name='User')
    op.drop_index('biometric_key', table_name='User')
    op.drop_table('User')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('User',
    sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    sa.Column('username', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('password', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('mail', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('biometric_key', mysql.TEXT(), nullable=True),
    sa.Column('created_at', mysql.DATETIME(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_general_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('username', 'User', ['username'], unique=False)
    op.create_index('mail', 'User', ['mail'], unique=False)
    op.create_index('biometric_key', 'User', ['biometric_key'], unique=False)
    op.drop_table('user')
    # ### end Alembic commands ###
