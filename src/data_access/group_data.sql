create table groups (
	id UUID NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	permissions VARCHAR(50)[] NOT NULL,
);
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'lmackinnon0', '{"READ", "WRITE", "DELETE", "UPDATE", "UPLOAD_FILES"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'pwestmarland1', '{"READ", "WRITE", "DELETE"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'hsumers2', '{"READ", "WRITE", "DELETE", "UPLOAD_FILES"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'lchrestien3', '{"READ", "WRITE"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'wkaemena4', '{"READ", "WRITE", "DELETE", "UPDATE"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'pmanketell5', '{"READ", "WRITE", "DELETE", "UPDATE", "UPLOAD_FILES"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'hminchinden6', '{"READ", "WRITE"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'dharewood7', '{"READ", "WRITE", "DELETE", "UPLOAD_FILES"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'dhardson8', '{"READ"}');
insert into groups (id, name, permissions) values (uuid_generate_v4(), 'dingon9', '{"WRITE", "DELETE"}');
